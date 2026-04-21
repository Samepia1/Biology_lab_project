import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="bg-charcoal py-14 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Chess queen icon */}
        <svg
          viewBox="0 0 24 18"
          width="36"
          height="36"
          className="mx-auto mb-4 text-gold"
          aria-hidden="true"
        >
          <path
            d="M12 2l3 6 4-2-1 6H6L5 6l4 2 3-6z M5 14h14v2H5z"
            fill="currentColor"
          />
        </svg>

        <h3 className="font-display text-xl text-cream mb-8">
          The Red Queen&rsquo;s Race
        </h3>

        {/* References */}
        <div className="mb-8">
          <h4 className="font-body text-sm uppercase tracking-widest text-cream/40 mb-4">
            References
          </h4>
          <ul className="space-y-2 font-body text-sm text-cream/60 leading-relaxed">
            <li>
              Van Valen, L. (1973). &ldquo;A New Evolutionary Law.&rdquo;{" "}
              <em>Evolutionary Theory</em>, 1, 1&ndash;30.
            </li>
            <li>
              Lively, C.M. (1987). &ldquo;Evidence from a New Zealand Snail for
              the Maintenance of Sex by Parasitism.&rdquo; <em>Nature</em>, 328,
              519&ndash;521.
            </li>
            <li>
              Carroll, L. (1871).{" "}
              <em>Through the Looking-Glass, and What Alice Found There</em>.
              Macmillan.
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px w-24 mx-auto bg-cream/10 mb-6" />

        <p className="font-body text-xs text-cream/30">
          Made for BIO Lab
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
