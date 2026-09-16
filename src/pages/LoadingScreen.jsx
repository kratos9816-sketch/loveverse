import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1800);
    const timer2 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-warm-darkwood px-4 text-center">
      <ParticleCanvas type="golden" density={30} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-20 flex flex-col items-center max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 rounded-full bg-amber-500/20 p-6 backdrop-blur-md border border-amber-400/40 shadow-2xl"
        >
          <Heart className="h-14 w-14 text-amber-400 fill-amber-400 text-glow-gold" />
        </motion.div>

        <AnimatePresence mode="wait">
          {stage === 0 ? (
            <motion.div
              key="prep"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-storybook text-2xl md:text-3xl font-bold text-amber-200 tracking-wider">
                Preparing your little universe… ❤️
              </h2>
              <p className="mt-2 font-sans text-sm text-amber-400/80 italic">
                Gathering golden memories and honey drops…
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="love"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-amber-300 text-glow-gold">
                Made with love.
              </h2>
              <p className="mt-2 font-sans text-sm text-amber-200/80">
                Opening the storybook…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Progress Bar */}
        <div className="mt-8 h-2 w-48 overflow-hidden rounded-full bg-amber-950/80 border border-amber-500/30">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.4, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-glow"
          />
        </div>
      </motion.div>
    </div>
  );
}
