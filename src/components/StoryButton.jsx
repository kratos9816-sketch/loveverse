import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/audioManager';

export default function StoryButton({ children, onClick, className = '', variant = 'gold', disabled = false }) {
  const handleClick = (e) => {
    if (disabled) return;
    playSound.buttonClick();
    if (onClick) onClick(e);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return 'bg-gradient-to-r from-amber-950 via-warm-darkwood to-amber-950 text-amber-200 border-amber-600/50 shadow-amber-950/50 hover:border-amber-400';
      case 'rose':
        return 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white border-pink-300 shadow-rose-900/40 hover:from-pink-400 hover:to-rose-500';
      case 'gold':
      default:
        return 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 border-amber-200/80 shadow-amber-600/40 hover:from-amber-400 hover:to-yellow-400';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96, y: 1 }}
      onClick={handleClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full border-2 px-6 py-3.5 font-storybook text-base md:text-lg font-bold tracking-wider uppercase shadow-xl backdrop-blur-md transition-all duration-200 ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Subtle inner highlight */}
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity hover:opacity-100 pointer-events-none" />
    </motion.button>
  );
}
