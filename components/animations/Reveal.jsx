"use client";
import { motion } from 'framer-motion';

export default function Reveal({ children,className="",type="bottomUp",duration=0.6,delay=0 }) {
 
  const variants = {
    bottomUp:{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
    },
    topDown:{
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0 },
    },
    scaleOut:{
        hidden: {scale: 0},
        visible: {scale: 1}
    },
    leftRight:{
        hidden: { opacity: 0, x: -25 },
        visible: { opacity: 1, x: 0 },
    },
    rightLeft:{
        hidden: { opacity: 0, x: 25 },
        visible: { opacity: 1, x: 0 },
    },
    fadeIn:{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
  }


  return (
      <motion.div
        variants={variants[type]}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: duration, delay: delay }}
        className={`${className}`}
      >
        {children}
      </motion.div>
  );
};
