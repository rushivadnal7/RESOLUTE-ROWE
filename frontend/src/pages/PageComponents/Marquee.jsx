import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  //data-scroll data-scroll-section data-scroll-speed='-.0'
  return (
    <div  className="marquee ">
      <div className="text-container">
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 10 }}
          className="text"
        >| Resolute & Rowe's classics |</motion.h1>
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 10 }}
          className="text"
        > Resolute & Rowe's classics</motion.h1>
      </div>
    </div>
  );
};

export default Marquee;
