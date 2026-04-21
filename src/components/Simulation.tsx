import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Organism {
  x: number;
  y: number;
  hue: number;
  alive: boolean;
  fadeOut: number; // 1 = fully visible, 0 = gone
  vx: number;
  vy: number;
}

interface Parasite {
  x: number;
  y: number;
  targetHue: number;
  vx: number;
  vy: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INITIAL_POP = 40;
const INITIAL_PARASITES = 8;
const ORGANISM_RADIUS = 5;
const PARASITE_SIZE = 6;
const KILL_DISTANCE = 14;
const HUE_TOLERANCE = 25; // how close a hue must be to match
const FADE_SPEED = 0.03;

const CANVAS_W = 800;
const CANVAS_H = 400;
const HALF_W = CANVAS_W / 2;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function hueToRgb(h: number, s = 75, l = 55): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/** Find the most common hue in a population (bucket by 30-degree increments). */
function dominantHue(organisms: Organism[]): number {
  const buckets = new Map<number, number>();
  for (const o of organisms) {
    if (!o.alive) continue;
    const bucket = Math.round(o.hue / 30) * 30;
    buckets.set(bucket, (buckets.get(bucket) ?? 0) + 1);
  }
  let maxCount = 0;
  let dominant = 0;
  for (const [hue, count] of buckets) {
    if (count > maxCount) {
      maxCount = count;
      dominant = hue;
    }
  }
  return dominant;
}

function hueDist(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function createOrganism(
  xMin: number,
  xMax: number,
  hue: number,
  randomHue: boolean
): Organism {
  return {
    x: rand(xMin + 20, xMax - 20),
    y: rand(30, CANVAS_H - 30),
    hue: randomHue ? rand(0, 360) : hue,
    alive: true,
    fadeOut: 1,
    vx: rand(-0.3, 0.3),
    vy: rand(-0.3, 0.3),
  };
}

function createParasite(xMin: number, xMax: number, targetHue: number): Parasite {
  return {
    x: rand(xMin + 20, xMax - 20),
    y: rand(30, CANVAS_H - 30),
    targetHue,
    vx: rand(-0.6, 0.6),
    vy: rand(-0.6, 0.6),
  };
}

// ---------------------------------------------------------------------------
// Draw helpers
// ---------------------------------------------------------------------------

function drawOrganism(ctx: CanvasRenderingContext2D, o: Organism) {
  if (o.fadeOut <= 0) return;
  ctx.globalAlpha = o.fadeOut;
  ctx.beginPath();
  ctx.arc(o.x, o.y, ORGANISM_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = hueToRgb(o.hue);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawParasite(ctx: CanvasRenderingContext2D, p: Parasite) {
  ctx.fillStyle = "#FF3030";
  ctx.beginPath();
  ctx.moveTo(p.x, p.y - PARASITE_SIZE);
  ctx.lineTo(p.x - PARASITE_SIZE * 0.7, p.y + PARASITE_SIZE * 0.6);
  ctx.lineTo(p.x + PARASITE_SIZE * 0.7, p.y + PARASITE_SIZE * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,80,80,0.6)";
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

function drawDivider(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(HALF_W, 0);
  ctx.lineTo(HALF_W, CANVAS_H);
  ctx.stroke();
  ctx.restore();
}

function drawLabels(ctx: CanvasRenderingContext2D) {
  ctx.font = "bold 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,248,240,0.6)";
  ctx.fillText("SEXUAL REPRODUCTION", HALF_W / 2, 18);
  ctx.fillText("ASEXUAL REPRODUCTION", HALF_W + HALF_W / 2, 18);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Simulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [sexualCount, setSexualCount] = useState(INITIAL_POP);
  const [asexualCount, setAsexualCount] = useState(INITIAL_POP);

  // Mutable simulation state lives in refs so the animation loop can access
  // the latest values without depending on React state re-renders.
  const sexualRef = useRef<Organism[]>([]);
  const asexualRef = useRef<Organism[]>([]);
  const sexParasitesRef = useRef<Parasite[]>([]);
  const asexParasitesRef = useRef<Parasite[]>([]);
  const speedRef = useRef(speed);
  const runningRef = useRef(false);
  const tickRef = useRef(0);

  // Keep speedRef in sync with the slider
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // -----------------------------------------------------------------------
  // Initialise / reset populations
  // -----------------------------------------------------------------------

  const initPopulations = useCallback(() => {
    const ASEXUAL_HUE = 170; // teal

    const sexual: Organism[] = [];
    const asexual: Organism[] = [];
    for (let i = 0; i < INITIAL_POP; i++) {
      sexual.push(createOrganism(0, HALF_W, 0, true));
      asexual.push(createOrganism(HALF_W, CANVAS_W, ASEXUAL_HUE, false));
    }

    const sexDominant = dominantHue(sexual);

    const sp: Parasite[] = [];
    const ap: Parasite[] = [];
    for (let i = 0; i < INITIAL_PARASITES; i++) {
      sp.push(createParasite(0, HALF_W, sexDominant));
      ap.push(createParasite(HALF_W, CANVAS_W, ASEXUAL_HUE));
    }

    sexualRef.current = sexual;
    asexualRef.current = asexual;
    sexParasitesRef.current = sp;
    asexParasitesRef.current = ap;
    tickRef.current = 0;

    setSexualCount(INITIAL_POP);
    setAsexualCount(INITIAL_POP);
  }, []);

  // -----------------------------------------------------------------------
  // Drawing (single frame)
  // -----------------------------------------------------------------------

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0D0D1A";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    drawDivider(ctx);
    drawLabels(ctx);

    // Draw organisms
    for (const o of sexualRef.current) drawOrganism(ctx, o);
    for (const o of asexualRef.current) drawOrganism(ctx, o);

    // Draw parasites
    for (const p of sexParasitesRef.current) drawParasite(ctx, p);
    for (const p of asexParasitesRef.current) drawParasite(ctx, p);
  }, []);

  // -----------------------------------------------------------------------
  // Simulation step
  // -----------------------------------------------------------------------

  const step = useCallback(() => {
    const s = speedRef.current;
    tickRef.current += 1;

    const moveEntity = (
      e: { x: number; y: number; vx: number; vy: number },
      xMin: number,
      xMax: number
    ) => {
      e.x += e.vx * s;
      e.y += e.vy * s;
      // Slight random walk
      e.vx += rand(-0.05, 0.05) * s;
      e.vy += rand(-0.05, 0.05) * s;
      // Clamp velocity
      const maxV = 0.8 * s;
      e.vx = Math.max(-maxV, Math.min(maxV, e.vx));
      e.vy = Math.max(-maxV, Math.min(maxV, e.vy));
      // Bounce off walls
      if (e.x < xMin + 10) {
        e.x = xMin + 10;
        e.vx = Math.abs(e.vx);
      }
      if (e.x > xMax - 10) {
        e.x = xMax - 10;
        e.vx = -Math.abs(e.vx);
      }
      if (e.y < 25) {
        e.y = 25;
        e.vy = Math.abs(e.vy);
      }
      if (e.y > CANVAS_H - 10) {
        e.y = CANVAS_H - 10;
        e.vy = -Math.abs(e.vy);
      }
    };

    // Move organisms
    for (const o of sexualRef.current) {
      if (!o.alive) continue;
      moveEntity(o, 0, HALF_W);
    }
    for (const o of asexualRef.current) {
      if (!o.alive) continue;
      moveEntity(o, HALF_W, CANVAS_W);
    }

    // Move parasites
    for (const p of sexParasitesRef.current) moveEntity(p, 0, HALF_W);
    for (const p of asexParasitesRef.current) moveEntity(p, HALF_W, CANVAS_W);

    // Parasites evolve target hue periodically (every ~120 ticks)
    if (tickRef.current % Math.max(1, Math.round(120 / s)) === 0) {
      const sexDom = dominantHue(sexualRef.current);
      for (const p of sexParasitesRef.current) {
        p.targetHue = sexDom;
      }
      // Asexual parasites always already match, but keep consistent
      const asexDom = dominantHue(asexualRef.current);
      for (const p of asexParasitesRef.current) {
        p.targetHue = asexDom;
      }
    }

    // Kill check
    const killCheck = (organisms: Organism[], parasites: Parasite[]) => {
      for (const p of parasites) {
        for (const o of organisms) {
          if (!o.alive) continue;
          const dx = o.x - p.x;
          const dy = o.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < KILL_DISTANCE && hueDist(o.hue, p.targetHue) < HUE_TOLERANCE) {
            o.alive = false;
          }
        }
      }
    };

    killCheck(sexualRef.current, sexParasitesRef.current);
    killCheck(asexualRef.current, asexParasitesRef.current);

    // Fade out dead organisms
    for (const o of [...sexualRef.current, ...asexualRef.current]) {
      if (!o.alive && o.fadeOut > 0) {
        o.fadeOut = Math.max(0, o.fadeOut - FADE_SPEED * s);
      }
    }

    // Parasite steering: parasites seek nearest matching organism
    const steerParasites = (parasites: Parasite[], organisms: Organism[]) => {
      for (const p of parasites) {
        let closest: Organism | null = null;
        let closestDist = Infinity;
        for (const o of organisms) {
          if (!o.alive) continue;
          if (hueDist(o.hue, p.targetHue) >= HUE_TOLERANCE) continue;
          const dx = o.x - p.x;
          const dy = o.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < closestDist) {
            closestDist = d;
            closest = o;
          }
        }
        if (closest) {
          const dx = closest.x - p.x;
          const dy = closest.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const steerForce = 0.04 * s;
          p.vx += (dx / d) * steerForce;
          p.vy += (dy / d) * steerForce;
        }
      }
    };

    steerParasites(sexParasitesRef.current, sexualRef.current);
    steerParasites(asexParasitesRef.current, asexualRef.current);

    // Update population counts
    setSexualCount(sexualRef.current.filter((o) => o.alive).length);
    setAsexualCount(asexualRef.current.filter((o) => o.alive).length);
  }, []);

  // -----------------------------------------------------------------------
  // Animation loop
  // -----------------------------------------------------------------------

  const loop = useCallback(() => {
    if (!runningRef.current) return;
    step();
    drawFrame();
    animRef.current = requestAnimationFrame(loop);
  }, [step, drawFrame]);

  // Draw the initial static frame when populations are initialised
  useEffect(() => {
    initPopulations();
    // We need a small delay so the canvas is mounted
    requestAnimationFrame(() => drawFrame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start / stop the loop when `running` changes
  useEffect(() => {
    runningRef.current = running;
    if (running) {
      animRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animRef.current);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [running, loop]);

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------

  const handleStartReset = () => {
    if (running) {
      // Reset
      setRunning(false);
      initPopulations();
      requestAnimationFrame(() => drawFrame());
    } else {
      setRunning(true);
    }
  };

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      id="simulation"
      className="bg-charcoal py-20 px-4 sm:px-8 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-[900px] mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-cream mb-3">
            Run the Experiment
          </h2>
          <p className="font-body text-cream-dark/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Watch how sexual reproduction generates genetic diversity that
            shields a population from parasites, while genetically identical
            asexual clones are rapidly wiped out &mdash; the{" "}
            <span className="text-gold font-semibold">Red Queen Effect</span> in
            action.
          </p>
        </div>

        {/* Population counters */}
        <div className="flex justify-between max-w-[800px] mx-auto mb-3 px-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: "hsl(280, 75%, 55%)" }}
            />
            <span className="font-body text-cream text-sm">
              Sexual:{" "}
              <span className="text-gold-light font-semibold">
                {sexualCount}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: "hsl(170, 75%, 55%)" }}
            />
            <span className="font-body text-cream text-sm">
              Asexual:{" "}
              <span className="text-gold-light font-semibold">
                {asexualCount}
              </span>
            </span>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="w-full max-w-[800px] rounded-lg border border-white/10"
            style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-xs font-body text-cream-dark/70">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: "hsl(50, 75%, 55%)" }}
            />
            Organism (varied hues = diverse genes)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: "hsl(170, 75%, 55%)" }}
            />
            Asexual clone (identical genes)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-0 h-0"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "8px solid #FF3030",
              }}
            />
            Parasite
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            onClick={handleStartReset}
            className="font-body font-semibold text-sm px-6 py-2.5 rounded-lg
                       bg-crimson text-cream
                       hover:bg-crimson-light active:bg-crimson-dark
                       transition-colors duration-150 cursor-pointer
                       shadow-md shadow-crimson-dark/40"
          >
            {running ? "Reset" : "Start Experiment"}
          </button>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sim-speed"
              className="font-body text-cream-dark/80 text-sm"
            >
              Speed
            </label>
            <input
              id="sim-speed"
              type="range"
              min={0.5}
              max={3}
              step={0.25}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-28 accent-gold cursor-pointer"
            />
            <span className="font-body text-gold-light text-sm w-8 text-right">
              {speed}x
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Simulation;
