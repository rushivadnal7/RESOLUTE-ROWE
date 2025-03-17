import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  return (
    <div className="marquee">
      <motion.div
        className="marquee-inner"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
      >
        <h1 className="text">| Resolute & Rowe's classics |</h1>
        <h1 className="text">| Resolute & Rowe's classics |</h1>
      </motion.div>
    </div>
  );
};

export default Marquee;
