import { motion } from "framer-motion";
import React from "react";

const Spinner = () => {
  return (
    <motion.div
      className="w-6 h-6 border-3 border-gray-300 border-t-gray-700 rounded-full mx-auto"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};
export default Spinner;
