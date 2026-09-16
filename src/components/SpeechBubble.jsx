import React from 'react';
import { motion } from 'framer-motion';

export default function SpeechBubble({ text, subtext, className = '', tail = 'bottom' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className={`relative z-20 max-w-xs md:max-w-sm rounded-2xl bg-warm-cream border-2 border-amber-600/40 p-4 shadow-xl font-sans text-amber-950 ${className}`}
    >
      <p className="text-base md:text-lg font-bold tracking-wide text-amber-950 text-center">
        {text}
      </p>
      {subtext && (
        <p className="mt-1.5 text-xs md:text-sm font-medium text-amber-800 text-center italic">
          {subtext}
        </p>
      )}

      {/* Speech bubble tail indicator */}
      {tail === 'bottom' && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-amber-600/40">
          <div className="absolute -top-[14px] -left-[8px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-warm-cream" />
        </div>
      )}
    </motion.div>
  );
}
