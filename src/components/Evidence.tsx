import { motion } from "framer-motion";

function LakeIcon() {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
      {/* Water / lake */}
      <ellipse cx="24" cy="30" rx="20" ry="10" fill="#8B1A1A" opacity="0.15" />
      <path
        d="M4 30 Q10 26 16 30 Q22 34 28 30 Q34 26 40 30 Q44 32 44 30"
        fill="none"
        stroke="#8B1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 34 Q12 30 18 34 Q24 38 30 34 Q36 30 42 34"
        fill="none"
        stroke="#8B1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Bug icon above water */}
      <circle cx="24" cy="16" r="4" fill="#B33A3A" opacity="0.7" />
      <line x1="20" y1="14" x2="17" y2="10" stroke="#B33A3A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="14" x2="31" y2="10" stroke="#B33A3A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StreamIcon() {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
      {/* Flowing stream */}
      <path
        d="M8 12 Q16 16 24 12 Q32 8 40 12"
        fill="none"
        stroke="#D4A853"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 22 Q14 26 22 22 Q30 18 38 22"
        fill="none"
        stroke="#D4A853"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 32 Q18 36 26 32 Q34 28 42 32"
        fill="none"
        stroke="#D4A853"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Peaceful check mark */}
      <path
        d="M18 40 l4 4 8-8"
        fill="none"
        stroke="#D4A853"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Evidence() {
  return (
    <section
      id="evidence"
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
          The Evidence
        </motion.h2>

        {/* Main feature card: Mud Snails */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg shadow-charcoal/5 border border-crimson/10 p-8 md:p-10 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
                New Zealand Mud Snails
              </h3>
              <p className="font-body text-sm text-charcoal/50 mb-4">
                <em>Potamopyrgus antipodarum</em> &mdash; Lively, 1987
              </p>
              <p className="font-body text-charcoal/80 leading-relaxed">
                In the lakes and streams of New Zealand, a tiny freshwater snail
                provided one of the most compelling tests of the Red Queen
                Hypothesis. These snails can reproduce both sexually and
                asexually, making them a natural experiment. Curtis Lively
                studied populations across habitats with varying levels of
                parasite pressure &mdash; and the results were striking.
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-parchment rounded-xl p-6 border border-crimson/10 flex items-start gap-4"
            >
              <div className="shrink-0 mt-1">
                <LakeIcon />
              </div>
              <div>
                <h4 className="font-display text-lg text-crimson mb-1">
                  Parasite-Rich Lakes
                </h4>
                <p className="font-body text-charcoal/80 leading-relaxed">
                  <span className="font-semibold">Sexual snails dominate.</span>{" "}
                  Where trematode parasites are abundant, sexual reproduction
                  provides the genetic diversity needed to stay ahead of
                  evolving threats.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-parchment rounded-xl p-6 border border-gold/20 flex items-start gap-4"
            >
              <div className="shrink-0 mt-1">
                <StreamIcon />
              </div>
              <div>
                <h4 className="font-display text-lg text-gold-light mb-1" style={{ color: "#9a7d2e" }}>
                  Parasite-Free Streams
                </h4>
                <p className="font-body text-charcoal/80 leading-relaxed">
                  <span className="font-semibold">Asexual snails thrive.</span>{" "}
                  Without parasite pressure, the efficiency of asexual
                  reproduction gives clonal snails the upper hand.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-body text-charcoal/80 leading-relaxed bg-cream-dark/50 rounded-lg p-4 border-l-4 border-gold"
          >
            This pattern is exactly what the Red Queen Hypothesis predicts:
            sexual reproduction is maintained where parasites exert strong
            selection pressure, because genetic diversity is the best defense
            against co-evolving enemies.
          </motion.p>
        </motion.div>

        {/* Secondary card: Toads */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md shadow-charcoal/5 border border-crimson/10 p-8"
        >
          <h3 className="font-display text-xl text-charcoal mb-2">
            Toads &amp; Lung Parasites
          </h3>
          <p className="font-body text-charcoal/70 leading-relaxed">
            Similar patterns have been observed across many species. Studies on
            toads and their lung parasites show that host populations under
            heavy parasitic load maintain higher genetic diversity &mdash;
            consistent with the Red Queen&rsquo;s prediction that
            co-evolutionary arms races drive the maintenance of sexual
            reproduction across the tree of life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Evidence;
