import { motion } from "framer-motion";

interface Step {
  label: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    label: "Step 1",
    description: "Hosts develop defenses",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <path
          d="M24 4 L38 12 L38 28 C38 37 24 44 24 44 C24 44 10 37 10 28 L10 12 Z"
          fill="none"
          stroke="#D4A853"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M20 24l4 4 6-8"
          fill="none"
          stroke="#D4A853"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Step 2",
    description: "Parasites evolve to overcome defenses",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        {/* Bug body */}
        <ellipse cx="24" cy="26" rx="10" ry="13" fill="none" stroke="#B33A3A" strokeWidth="2.5" />
        {/* Head */}
        <circle cx="24" cy="12" r="5" fill="none" stroke="#B33A3A" strokeWidth="2.5" />
        {/* Legs */}
        <line x1="14" y1="22" x2="6" y2="18" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="28" x2="6" y2="30" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="34" x2="6" y2="38" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="22" x2="42" y2="18" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="28" x2="42" y2="30" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="34" x2="42" y2="38" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        {/* Antennae */}
        <line x1="21" y1="8" x2="16" y2="2" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="8" x2="32" y2="2" stroke="#B33A3A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Step 3",
    description: "Common host genotypes become vulnerable",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        {/* Target rings */}
        <circle cx="24" cy="24" r="20" fill="none" stroke="#B33A3A" strokeWidth="2" />
        <circle cx="24" cy="24" r="14" fill="none" stroke="#B33A3A" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="#B33A3A" strokeWidth="2" />
        <circle cx="24" cy="24" r="3" fill="#B33A3A" />
      </svg>
    ),
  },
  {
    label: "Step 4",
    description: "Hosts must evolve new defenses",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        {/* Circular arrow */}
        <path
          d="M24 8 A16 16 0 1 1 10 18"
          fill="none"
          stroke="#D4A853"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon points="10,10 6,20 14,18" fill="#D4A853" />
      </svg>
    ),
  },
];

/* Simple arrow SVG connecting steps */
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 32 16"
      width="32"
      height="16"
      className="text-gold/50 hidden md:block"
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="26" y2="8" stroke="currentColor" strokeWidth="2" />
      <polygon points="24,4 32,8 24,12" fill="currentColor" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 16 32"
      width="16"
      height="32"
      className="text-gold/50 mx-auto md:hidden"
      aria-hidden="true"
    >
      <line x1="8" y1="0" x2="8" y2="26" stroke="currentColor" strokeWidth="2" />
      <polygon points="4,24 8,32 12,24" fill="currentColor" />
    </svg>
  );
}

function ArmsRace() {
  return (
    <section
      id="arms-race"
      className="bg-charcoal py-20 md:py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-cream text-center mb-16"
        >
          The Evolutionary Arms Race
        </motion.h2>

        {/* Desktop: 2x2 grid with arrows */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-y-6 gap-x-4 items-center justify-items-center mb-14">
          {/* Row 1: Step 1 -> Arrow -> Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="bg-charcoal-light rounded-2xl p-6 border border-cream/10 text-center w-full max-w-xs"
          >
            <div className="flex justify-center mb-3">{steps[0].icon}</div>
            <p className="font-display text-sm text-gold-light mb-1">{steps[0].label}</p>
            <p className="font-body text-cream/90">{steps[0].description}</p>
          </motion.div>

          <ArrowRight />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-charcoal-light rounded-2xl p-6 border border-cream/10 text-center w-full max-w-xs"
          >
            <div className="flex justify-center mb-3">{steps[1].icon}</div>
            <p className="font-display text-sm text-gold-light mb-1">{steps[1].label}</p>
            <p className="font-body text-cream/90">{steps[1].description}</p>
          </motion.div>

          {/* Row 2: curved return arrow (visual connector) */}
          <div />
          <svg viewBox="0 0 32 40" width="32" height="40" className="text-gold/30" aria-hidden="true">
            <line x1="16" y1="0" x2="16" y2="36" stroke="currentColor" strokeWidth="2" />
            <polygon points="12,34 16,42 20,34" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 32 40" width="32" height="40" className="text-gold/30" aria-hidden="true">
            <line x1="16" y1="0" x2="16" y2="36" stroke="currentColor" strokeWidth="2" />
            <polygon points="12,34 16,42 20,34" fill="currentColor" />
          </svg>

          {/* Row 3: Step 4 <- Arrow <- Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-charcoal-light rounded-2xl p-6 border border-cream/10 text-center w-full max-w-xs"
          >
            <div className="flex justify-center mb-3">{steps[3].icon}</div>
            <p className="font-display text-sm text-gold-light mb-1">{steps[3].label}</p>
            <p className="font-body text-cream/90">{steps[3].description}</p>
          </motion.div>

          <svg
            viewBox="0 0 32 16"
            width="32"
            height="16"
            className="text-gold/50"
            aria-hidden="true"
          >
            <line x1="6" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="2" />
            <polygon points="8,4 0,8 8,12" fill="currentColor" />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-charcoal-light rounded-2xl p-6 border border-cream/10 text-center w-full max-w-xs"
          >
            <div className="flex justify-center mb-3">{steps[2].icon}</div>
            <p className="font-display text-sm text-gold-light mb-1">{steps[2].label}</p>
            <p className="font-body text-cream/90">{steps[2].description}</p>
          </motion.div>
        </div>

        {/* Mobile: vertical layout */}
        <div className="flex flex-col items-center gap-2 md:hidden mb-14">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              {i > 0 && <ArrowDown />}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-charcoal-light rounded-2xl p-6 border border-cream/10 text-center w-full max-w-xs"
              >
                <div className="flex justify-center mb-3">{step.icon}</div>
                <p className="font-display text-sm text-gold-light mb-1">
                  {step.label}
                </p>
                <p className="font-body text-cream/90">{step.description}</p>
              </motion.div>
            </div>
          ))}
          {/* Loop-back arrow */}
          <svg
            viewBox="0 0 40 40"
            width="40"
            height="40"
            className="text-gold/40 mt-2"
            aria-hidden="true"
          >
            <path
              d="M20 36 A16 16 0 1 1 34 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polygon points="32,14 36,24 28,22" fill="currentColor" />
          </svg>
          <p className="text-gold/40 text-xs font-body uppercase tracking-widest">
            Cycle repeats
          </p>
        </div>

        {/* Desktop loop indicator */}
        <div className="hidden md:flex justify-center mb-14">
          <div className="flex items-center gap-2 text-gold/40">
            <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
              <path
                d="M24 8 A16 16 0 1 1 10 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <polygon points="10,10 6,20 14,18" fill="currentColor" />
            </svg>
            <span className="text-xs font-body uppercase tracking-widest">
              Cycle repeats endlessly
            </span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-body text-lg text-cream/70 text-center max-w-3xl mx-auto leading-relaxed"
        >
          Parasites always target the most common host genotypes because
          that&rsquo;s where the greatest payoff lies. Once a genotype becomes
          common, parasites rapidly adapt to exploit it &mdash; creating
          constant evolutionary pressure for hosts to diversify their genetic
          defenses. This never-ending cycle is the essence of the Red
          Queen&rsquo;s race.
        </motion.p>
      </div>
    </section>
  );
}

export default ArmsRace;
