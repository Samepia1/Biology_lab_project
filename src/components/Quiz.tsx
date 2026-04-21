import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation: string;
}

const questions: QuizQuestion[] = [
  {
    question: "What is the 'two-fold cost' of sexual reproduction?",
    options: [
      { text: "It requires twice as much energy", isCorrect: false },
      {
        text: "Only half of an organism's genes are passed to offspring",
        isCorrect: true,
      },
      { text: "It takes twice as long to reproduce", isCorrect: false },
      { text: "Offspring are only half as fit", isCorrect: false },
    ],
    explanation:
      "In sexual reproduction, each parent contributes only 50% of its genome to offspring, meaning half of an organism's genetic material is 'lost' each generation — the so-called two-fold cost.",
  },
  {
    question:
      "The Red Queen Hypothesis is named after a character from which book?",
    options: [
      { text: "Alice's Adventures in Wonderland", isCorrect: false },
      { text: "Through the Looking-Glass", isCorrect: true },
      { text: "The Origin of Species", isCorrect: false },
      { text: "The Selfish Gene", isCorrect: false },
    ],
    explanation:
      'The Red Queen appears in Lewis Carroll\'s "Through the Looking-Glass" (1871), where she tells Alice, "It takes all the running you can do, to keep in the same place."',
  },
  {
    question:
      "According to the Red Queen Hypothesis, why is sexual reproduction advantageous?",
    options: [
      { text: "It produces more offspring", isCorrect: false },
      {
        text: "It creates genetic diversity that helps resist parasites",
        isCorrect: true,
      },
      { text: "It makes organisms physically stronger", isCorrect: false },
      { text: "It allows organisms to live longer", isCorrect: false },
    ],
    explanation:
      "Sexual reproduction shuffles genes each generation, producing genetically diverse offspring that are harder for co-evolving parasites to exploit.",
  },
  {
    question:
      "In Lively's classic study, where did sexually reproducing snails dominate?",
    options: [
      { text: "In parasite-free streams", isCorrect: false },
      { text: "In laboratory conditions", isCorrect: false },
      { text: "In parasite-rich lakes", isCorrect: true },
      { text: "In tropical environments", isCorrect: false },
    ],
    explanation:
      "Curtis Lively found that sexual snails were more common in lakes with high parasite loads, while asexual clones dominated in parasite-free streams — exactly as the Red Queen Hypothesis predicts.",
  },
  {
    question: "What do parasites tend to evolve to attack?",
    options: [
      { text: "The oldest organisms", isCorrect: false },
      { text: "The largest organisms", isCorrect: false },
      { text: "The most common genotypes", isCorrect: true },
      { text: "Organisms that reproduce sexually", isCorrect: false },
    ],
    explanation:
      "Parasites evolve to exploit the most common host genotypes (negative frequency-dependent selection), giving rare genotypes a survival advantage and maintaining genetic diversity.",
  },
];

function getScoreMessage(score: number, total: number): string {
  if (score === total) return "You've outrun the Red Queen! Perfect score!";
  if (score >= 3) return "Impressive! You're keeping pace with the Red Queen.";
  if (score >= 1) return "The parasites are catching up! Try the reading again.";
  return "Looks like the parasites won this round!";
}

const optionLabels = ["A", "B", "C", "D"] as const;

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [direction, setDirection] = useState(1);

  const question = questions[currentQuestion];

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(optionIndex);
      if (question.options[optionIndex].isCorrect) {
        setScore((prev) => prev + 1);
      }
    },
    [selectedAnswer, question]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    // Reset direction for forward motion after a tick
    setTimeout(() => setDirection(1), 50);
  }, []);

  const getOptionStyle = (index: number): string => {
    if (selectedAnswer === null) {
      return "bg-white border-2 border-cream-dark hover:border-crimson-light text-charcoal";
    }

    const option = question.options[index];
    if (option.isCorrect) {
      return "bg-emerald-50 border-2 border-emerald-500 text-emerald-800";
    }
    if (index === selectedAnswer && !option.isCorrect) {
      return "bg-red-50 border-2 border-red-400 text-red-800";
    }
    return "bg-white border-2 border-cream-dark text-charcoal/50";
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <motion.section
      id="quiz"
      className="bg-parchment py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="font-display text-4xl sm:text-5xl font-bold text-charcoal text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Test Your Knowledge
        </motion.h2>

        <AnimatePresence mode="wait" custom={direction}>
          {isFinished ? (
            /* ── Score Screen ── */
            <motion.div
              key="score-screen"
              className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <p className="font-body text-sm uppercase tracking-widest text-charcoal-light mb-4">
                Your Result
              </p>

              <motion.div
                className="text-7xl sm:text-8xl font-display font-bold text-gold mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 14,
                  delay: 0.25,
                }}
              >
                {score}/{questions.length}
              </motion.div>

              <motion.p
                className="font-body text-lg text-charcoal-light mt-4 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {getScoreMessage(score, questions.length)}
              </motion.p>

              <motion.button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 bg-crimson text-cream font-body font-semibold px-8 py-3 rounded-xl shadow-md cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "#5C1111" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            /* ── Question Card ── */
            <motion.div
              key={`question-${currentQuestion}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-sm text-charcoal-light">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`block w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        i === currentQuestion
                          ? "bg-crimson"
                          : i < currentQuestion
                            ? "bg-crimson-light/50"
                            : "bg-cream-dark"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal mb-6 leading-snug">
                {question.question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`relative flex items-center gap-3 text-left w-full px-4 py-3.5 rounded-xl font-body text-base transition-colors duration-200 cursor-pointer disabled:cursor-default ${getOptionStyle(index)}`}
                    whileHover={
                      selectedAnswer === null ? { scale: 1.02 } : undefined
                    }
                    whileTap={
                      selectedAnswer === null ? { scale: 0.98 } : undefined
                    }
                    animate={
                      selectedAnswer !== null &&
                      (option.isCorrect || index === selectedAnswer)
                        ? {
                            scale: [1, 1.03, 1],
                            transition: { duration: 0.35 },
                          }
                        : undefined
                    }
                  >
                    {/* Label badge */}
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-semibold text-sm ${
                        selectedAnswer === null
                          ? "bg-cream text-charcoal-light"
                          : option.isCorrect
                            ? "bg-emerald-500 text-white"
                            : index === selectedAnswer
                              ? "bg-red-400 text-white"
                              : "bg-cream text-charcoal-light/50"
                      }`}
                    >
                      {selectedAnswer !== null && option.isCorrect ? (
                        /* Checkmark */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : selectedAnswer !== null &&
                        index === selectedAnswer &&
                        !option.isCorrect ? (
                        /* X mark */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      ) : (
                        optionLabels[index]
                      )}
                    </span>

                    <span>{option.text}</span>
                  </motion.button>
                ))}
              </div>

              {/* Explanation + Next */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 p-4 bg-cream rounded-xl border border-cream-dark">
                      <p className="font-body text-sm text-charcoal-light leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <motion.button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 bg-crimson text-cream font-body font-semibold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#5C1111",
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {currentQuestion < questions.length - 1
                          ? "Next"
                          : "See Results"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
