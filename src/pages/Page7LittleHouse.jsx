import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BearCharacter from '../components/BearCharacter';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';

export default function Page7LittleHouse({ onNext }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1800);
    const t2 = setTimeout(() => setStep(2), 3600);
    const t3 = setTimeout(() => setStep(3), 5600);
    const t4 = setTimeout(() => setStep(4), 7600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-amber-950 via-warm-darkwood to-slate-950 px-4 py-8 text-center">
      <ParticleCanvas type="golden" density={25} />

      {/* Warm Cozy Cottage Vector Illustration */}
      <div className="relative z-20 mt-4 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative h-64 w-80 rounded-t-full bg-amber-900/40 p-4 border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.4)] flex flex-col items-center justify-end overflow-hidden"
        >
          {/* Window to Starry Night */}
          <div className="absolute top-8 h-20 w-24 rounded-t-full bg-slate-950 border-2 border-amber-400/60 overflow-hidden flex items-center justify-center">
            <span className="text-xs text-amber-200 animate-twinkle">✨ 🌙 ✨</span>
          </div>

          {/* Candle Table & Chairs */}
          <div className="relative z-10 flex items-center gap-6 mb-2">
            <span className="text-2xl">🪑</span>
            <div className="flex flex-col items-center">
              <span className="text-xl animate-pulse">🕯️</span>
              <div className="h-6 w-12 rounded bg-amber-800 border border-amber-500" />
            </div>
            <span className="text-2xl">🪑</span>
          </div>
        </motion.div>
      </div>

      {/* Sequential Heartfelt Text Reveal */}
      <div className="relative z-20 my-6 max-w-lg min-h-[160px] flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="s0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-storybook text-2xl md:text-3xl font-bold text-amber-200"
            >
              “Home isn’t always a place.”
            </motion.p>
          )}

          {step === 1 && (
            <motion.p
              key="s1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-storybook text-2xl md:text-3xl font-bold text-amber-300"
            >
              “Sometimes…”
            </motion.p>
          )}

          {step === 2 && (
            <motion.p
              key="s2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-handwriting text-3xl md:text-4xl font-bold text-pink-300 text-glow-heart"
            >
              “It’s a person. And somehow… you became mine. ❤️”
            </motion.p>
          )}

          {step >= 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="font-handwriting text-2xl md:text-3xl font-bold text-amber-100">
                “I don’t need a perfect world. I just want a world where I can keep making memories with you.”
              </p>
              {step >= 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                  <StoryButton onClick={onNext} variant="gold">
                    NEXT →
                  </StoryButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bear Character cozy posture */}
      <div className="relative z-20 mb-4">
        <BearCharacter expression="happy" scale={1.1} />
      </div>
    </div>
  );
}
