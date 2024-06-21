import React from "react";
import { motion } from "framer-motion";
const Motion = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: "100%" }} // M
      transition={{ duration: 0.4, ease: [0.42, 1, 0.58, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
