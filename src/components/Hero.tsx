import { motion } from "framer-motion";

const chessPieces = [
  // Crown / Queen shapes at various positions
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "10%",
    y: "15%",
    size: 60,
    duration: 18,
    delay: 0,
  },
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "80%",
    y: "25%",
    size: 45,
    duration: 22,
    delay: 2,
  },
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "25%",
    y: "70%",
    size: 35,
    duration: 20,
    delay: 4,
  },
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "65%",
    y: "60%",
    size: 50,
    duration: 25,
    delay: 1,
  },
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "45%",
    y: "85%",
    size: 40,
    duration: 19,
    delay: 3,
  },
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "90%",
    y: "75%",
    size: 30,
    duration: 23,
    delay: 5,
  },
  {
    d: "M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z",
    x: "5%",
    y: "45%",
    size: 38,
    duration: 21,
    delay: 2.5,
  },
];

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-charcoal via-charcoal-light to-crimson-dark flex items-center justify-center">
      {/* Floating chess pieces */}
      {chessPieces.map((piece, i) => (
        <svg
          key={i}
          viewBox="0 0 24 18"
          width={piece.size}
          height={piece.size}
          className="absolute opacity-[0.07] text-cream"
          style={{
            left: piece.x,
            top: piece.y,
            animation: `float ${piece.duration}s ease-in-out ${piece.delay}s infinite`,
          }}
        >
          <path d={piece.d} fill="currentColor" />
        </svg>
      ))}

      {/* CSS keyframes for floating */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(5deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
          75% { transform: translateY(-25px) rotate(2deg); }
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-8xl text-cream leading-tight tracking-tight"
        >
          The Red Queen&rsquo;s Race
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mx-auto my-6 md:my-8 h-[2px] w-32 md:w-48 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="font-display italic text-lg sm:text-xl md:text-2xl text-cream/80 max-w-2xl mx-auto leading-relaxed"
        >
          &ldquo;It takes all the running you can do, to keep in the same
          place.&rdquo;
          <span className="block mt-2 text-base text-gold-light not-italic">
            &mdash; Lewis Carroll,{" "}
            <em>Through the Looking-Glass</em>
          </span>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#problem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 hover:text-cream/80 transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-xs font-body uppercase tracking-widest">
          Scroll
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}

export default Hero;
