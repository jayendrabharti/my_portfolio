"use client";
import { motion } from 'framer-motion';

export default function RevealHero({ children, width = "fit-content", className=""}){

  return (
    <div style={{width: width}} 
      className={`${className} relative overflow-hidden`}
    >
      <motion.div
        className="slide absolute top-0 left-0 bottom-0 right-0 bg-logoColor z-20"
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0, ease: "easeIn" }}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, left: "100%" },
          visible: { opacity: 1, left: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
