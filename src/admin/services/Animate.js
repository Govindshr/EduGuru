import { motion } from "framer-motion";

const heading = "Empowering Brand Growth Together";

const wordVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.3,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.03,
    },
  }),
};

function AnimatedHeading() {
  const words = heading.split(" ");

  return (
    <h2 className="mw-100 d-flex flex-wrap">
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="me-2 d-inline-block overflow-hidden"
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          custom={wordIndex}
        >
          <motion.span
            className="d-inline-block"
            initial="hidden"
            animate="visible"
            variants={charVariants}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="d-inline-block"
                variants={charVariants}
                custom={charIndex}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.span>
      ))}
    </h2>
  );
}

export default AnimatedHeading;
