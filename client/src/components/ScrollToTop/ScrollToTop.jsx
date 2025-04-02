import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const scrollUp = () => {
  const scrollableElement = document.querySelector("body > div");
  if (scrollableElement) {
    scrollableElement.scrollTop = 0;
  }
};
const ScrollToTop = () => {
  return (
    <div>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        onClick={scrollUp}
        className="fixed bottom-2 right-5 w-10 h-10 flex justify-center items-center rounded-2xl text-white text-xl bg-primary shadow-[0_1px_2px_1px_rgba(0,0,0,0.6)] cursor-pointer"
      >
        <FontAwesomeIcon icon={faAnglesUp} />
      </motion.div>
    </div>
  );
};

export default ScrollToTop;
export { scrollUp };
