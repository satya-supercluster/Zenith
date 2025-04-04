import React from "react";
import { motion } from "framer-motion";

const UnderConstruction = () => {
  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.5,
      },
    },
  };

  // Variants for child elements
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Animation for the "working" text
  const workingTextVariants = {
    animate: {
      opacity: [1, 0.5, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-center justify-center text-gray-100 p-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-5xl max-sm:text-3xl font-bold mb-4"
        variants={itemVariants}
      >
        Site Under Construction
      </motion.h1>

      <motion.p className="text-lg mb-6" variants={itemVariants}>
        We're
        <motion.span
          variants={workingTextVariants}
          animate="animate"
          className="mx-1 font-medium text-blue-300"
        >
          working
        </motion.span>
        on something awesome. Stay tuned!
      </motion.p>

      <motion.div
        className="mt-4"
        variants={itemVariants}
        animate={{
          rotate: [0, 5, -5, 5, 0],
          transition: { duration: 2, repeat: Infinity },
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M12 6V12L16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
            fill="none"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default UnderConstruction;
