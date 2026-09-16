import React from 'react';
import { motion } from 'framer-motion';

export default function SceneContainer({ children, className = '', bgTheme = 'forest' }) {
  const getThemeBg = () => {
    switch (bgTheme) {
      case 'night':
        return 'bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950';
      case 'meadow':
        return 'bg-gradient-to-b from-emerald-950 via-teal-950 to-amber-950';
      case 'paper':
        return 'paper-texture bg-warm-cream text-amber-950';
      case 'house':
        return 'bg-gradient-to-b from-amber-950 via-warm-darkwood to-slate-950';
      case 'forest':
      default:
        return 'bg-gradient-to-b from-amber-950/80 via-forest-deep to-amber-950';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-screen w-full overflow-hidden ${getThemeBg()} ${className}`}
    >
      {children}
    </motion.div>
  );
}
