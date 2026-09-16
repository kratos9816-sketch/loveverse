import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import BearCharacter from '../components/BearCharacter';
import { playSound } from '../utils/audioManager';

export default function FinalLoveverse({ onReplay }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    playSound.sparkle();
    const t1 = setTimeout(() => setStep(1), 2000);
    const t2 = setTimeout(() => setStep(2), 4000);
    const t3 = setTimeout(() => setStep(3), 6000);
    const t4 = setTimeout(() => {
      setStep(4);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f472b6', '#ec4899']
      });
    }, 8000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-slate-950 px-4 py-8 text-center text-amber-100">
      <ParticleCanvas type="hearts" density={45} />

      {/* Main Galaxy Title Container */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-4 text-6xl md:text-7xl filter drop-shadow-[0_0_30px_rgba(244,114,182,0.9)]"
        >
          🌌 ❤️ 🌌
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-storybook text-5xl md:text-7xl font-extrabold text-amber-200 text-glow-gold tracking-widest"
        >
          OUR LOVEVERSE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 space-y-2 font-handwriting text-2xl md:text-3xl text-amber-100"
        >
          <p>Built from memories.</p>
          <p>Held together by love.</p>
          <p>Made for you. ❤️</p>
        </motion.div>

        {/* Sequential Closing Text */}
        <div className="mt-8 min-h-[100px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.p
                key="end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-storybook text-2xl text-amber-300 tracking-widest"
              >
                THE END…
              </motion.p>
            )}

            {step === 2 && (
              <motion.p
                key="maybe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-storybook text-2xl text-pink-300 tracking-widest text-glow-heart"
              >
                OR MAYBE…
              </motion.p>
            )}

            {step >= 3 && (
              <motion.div
                key="beg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="font-storybook text-3xl font-bold text-amber-200 text-glow-gold">
                  JUST THE BEGINNING.
                </p>
                <p className="font-sans text-sm text-amber-400/80 font-bold uppercase tracking-widest">
                  Chapter 1 complete.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Replay Button */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <StoryButton onClick={onReplay} variant="gold">
              🍯 REPLAY OUR LOVEVERSE
            </StoryButton>
          </motion.div>
        )}
      </div>

      <div className="relative z-20 mb-4">
        <BearCharacter expression="happy" scale={1.1} />
      </div>
    </div>
  );
}
