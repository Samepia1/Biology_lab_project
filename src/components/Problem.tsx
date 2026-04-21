import { motion } from "framer-motion";

function AsexualIcon() {
  return (
    <svg
      viewBox="0 0 120 100"
      width="120"
      height="100"
      className="mx-auto mb-4"
      aria-hidden="true"
    >
      {/* Parent organism */}
      <circle cx="30" cy="50" r="16" fill="#8B1A1A" opacity="0.8" />
      <text x="30" y="55" textAnchor="middle" fill="#FFF8F0" fontSize="12" fontWeight="bold">
        A
      </text>
      {/* Arrow */}
      <line x1="50" y1="50" x2="65" y2="35" stroke="#D4A853" strokeWidth="2" />
      <line x1="50" y1="50" x2="65" y2="65" stroke="#D4A853" strokeWidth="2" />
      <polygon points="65,31 70,37 62,37" fill="#D4A853" />
      <polygon points="65,69 70,63 62,63" fill="#D4A853" />
      {/* Clone 1 */}
      <circle cx="85" cy="33" r="14" fill="#8B1A1A" opacity="0.8" />
      <text x="85" y="38" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontWeight="bold">
        A
      </text>
      {/* Clone 2 */}
      <circle cx="85" cy="67" r="14" fill="#8B1A1A" opacity="0.8" />
      <text x="85" y="72" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontWeight="bold">
        A
      </text>
    </svg>
  );
}

function SexualIcon() {
  return (
    <svg
      viewBox="0 0 140 100"
      width="140"
      height="100"
      className="mx-auto mb-4"
      aria-hidden="true"
    >
      {/* Parent A */}
      <circle cx="25" cy="35" r="14" fill="#8B1A1A" opacity="0.8" />
      <text x="25" y="40" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontWeight="bold">
        A
      </text>
      {/* Parent B */}
      <circle cx="25" cy="70" r="14" fill="#5C1111" opacity="0.8" />
      <text x="25" y="75" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontWeight="bold">
        B
      </text>
      {/* Arrows converging */}
      <line x1="42" y1="38" x2="58" y2="50" stroke="#D4A853" strokeWidth="2" />
      <line x1="42" y1="67" x2="58" y2="55" stroke="#D4A853" strokeWidth="2" />
      {/* Merge point */}
      <circle cx="65" cy="52" r="4" fill="#D4A853" />
      {/* Arrow to offspring */}
      <line x1="72" y1="52" x2="88" y2="52" stroke="#D4A853" strokeWidth="2" />
      <polygon points="90,48 96,52 90,56" fill="#D4A853" />
      {/* Mixed offspring */}
      <circle cx="110" cy="52" r="16" fill="url(#mixGrad)" opacity="0.9" />
      <text x="110" y="57" textAnchor="middle" fill="#FFF8F0" fontSize="10" fontWeight="bold">
        AB
      </text>
      <defs>
        <linearGradient id="mixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B1A1A" />
          <stop offset="100%" stopColor="#5C1111" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Problem() {
  return (
    <section
      id="problem"
      className="bg-cream py-20 md:py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-crimson text-center mb-14"
        >
          Why Does Sex Exist?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Asexual Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg shadow-charcoal/5 p-8 border border-cream-dark"
          >
            <h3 className="font-display text-2xl text-charcoal text-center mb-4">
              Asexual Reproduction
            </h3>
            <AsexualIcon />
            <p className="font-body text-charcoal/80 text-center leading-relaxed">
              <span className="font-semibold text-crimson">100%</span> of genes
              passed to offspring. Simple, efficient, and fast.
            </p>
          </motion.div>

          {/* Sexual Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg shadow-charcoal/5 p-8 border border-cream-dark"
          >
            <h3 className="font-display text-2xl text-charcoal text-center mb-4">
              Sexual Reproduction
            </h3>
            <SexualIcon />
            <p className="font-body text-charcoal/80 text-center leading-relaxed">
              Only <span className="font-semibold text-crimson">50%</span> of
              genes passed. Requires finding a mate. So why bother?
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body text-lg text-charcoal/80 text-center max-w-3xl mx-auto leading-relaxed"
        >
          This is the{" "}
          <span className="font-semibold text-crimson">
            &ldquo;two-fold cost of sex&rdquo;
          </span>{" "}
          &mdash; one of biology&rsquo;s biggest puzzles. If asexual
          reproduction is twice as efficient, why do most complex organisms
          reproduce sexually? The answer lies in an evolutionary arms
          race&hellip;
        </motion.p>
      </div>
    </section>
  );
}

export default Problem;
