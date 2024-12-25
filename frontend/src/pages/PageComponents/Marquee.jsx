import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  return (
    <div data-scroll data-scroll-section data-scroll-speed='-.2' className="marquee ">
      <div className="text-container">
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 10 }}
          className="text"
        >| Resoulute & Rowe's classics |</motion.h1>
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 10 }}
          className="text"
        > Resoulute & Rowe's classics</motion.h1>
      </div>
    </div>
  );
};

export default Marquee;
