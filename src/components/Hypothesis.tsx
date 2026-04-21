import { motion } from "framer-motion";

const sexualColors = [
  "bg-crimson",
  "bg-crimson-light",
  "bg-crimson-dark",
  "bg-gold",
  "bg-gold-light",
  "bg-charcoal",
  "bg-charcoal-light",
  "bg-crimson/70",
  "bg-gold/70",
  "bg-crimson-light/70",
  "bg-charcoal/60",
  "bg-crimson-dark/80",
];

function Hypothesis() {
  return (
    <section
      id="hypothesis"
      className="bg-parchment py-20 md:py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-4xl md:text-5xl text-crimson mb-3">
            The Red Queen Hypothesis
          </h2>
          <p className="font-body text-charcoal/60 text-lg">
            Proposed by Leigh Van Valen in 1973
          </p>
        </motion.div>

        {/* Key insight blockquote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border-l-4 border-gold bg-white/60 rounded-r-xl py-6 px-8 my-12 max-w-3xl mx-auto shadow-sm"
        >
          <p className="font-display text-xl md:text-2xl text-charcoal leading-relaxed italic">
            &ldquo;Sexual reproduction creates novel genotype combinations in
            every generation, making it impossible for parasites to fully adapt
            to their hosts.&rdquo;
          </p>
        </motion.blockquote>

        {/* Visualization: sexual vs asexual offspring */}
        <div className="grid md:grid-cols-2 gap-10 mb-12 max-w-4xl mx-auto">
          {/* Sexual offspring — diverse */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="font-display text-xl text-charcoal mb-4">
              Sexual Offspring
            </h3>
            <p className="font-body text-sm text-charcoal/50 mb-4">
              Each genetically unique
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {sexualColors.map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className={`w-10 h-10 rounded-full ${color} border-2 border-white shadow-md`}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 text-charcoal/40">
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <path
                  d="M10 4 L10 16 M4 10 L16 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-body text-xs uppercase tracking-wider">
                Moving target &mdash; hard to attack
              </span>
            </div>
          </motion.div>

          {/* Asexual offspring — identical */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center relative"
          >
            <h3 className="font-display text-xl text-charcoal mb-4">
              Asexual Offspring
            </h3>
            <p className="font-body text-sm text-charcoal/50 mb-4">
              All genetically identical
            </p>
            <div className="relative flex flex-wrap justify-center gap-3 mb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="w-10 h-10 rounded-full bg-crimson border-2 border-white shadow-md"
                />
              ))}

              {/* Animated "parasite" arrows targeting identical group */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: 1.0,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1.5,
                }}
                className="absolute -right-2 top-1/2 -translate-y-1/2"
              >
                <svg viewBox="0 0 40 20" width="40" height="20" aria-hidden="true">
                  <line x1="36" y1="10" x2="8" y2="10" stroke="#B33A3A" strokeWidth="2.5" />
                  <polygon points="8,6 0,10 8,14" fill="#B33A3A" />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: 1.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1.5,
                }}
                className="absolute -right-4 top-1/4"
              >
                <svg viewBox="0 0 32 16" width="32" height="16" aria-hidden="true">
                  <line x1="28" y1="8" x2="6" y2="8" stroke="#B33A3A" strokeWidth="2" opacity="0.7" />
                  <polygon points="6,4.5 0,8 6,11.5" fill="#B33A3A" opacity="0.7" />
                </svg>
              </motion.div>
            </div>
            <div className="flex items-center justify-center gap-1 text-crimson-light">
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-body text-xs uppercase tracking-wider">
                Easy target for parasites
              </span>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-body text-lg text-charcoal/80 text-center max-w-3xl mx-auto leading-relaxed"
        >
          Genetic diversity is a{" "}
          <span className="font-semibold text-crimson">moving target</span> that
          parasites can never fully catch. By shuffling genes every generation,
          sexual reproduction ensures that no single parasite strain can sweep
          through an entire population &mdash; keeping both hosts and parasites
          locked in an endless evolutionary race.
        </motion.p>
      </div>
    </section>
  );
}

export default Hypothesis;
