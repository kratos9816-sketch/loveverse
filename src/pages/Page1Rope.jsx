import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BearCharacter from '../components/BearCharacter';
import SpeechBubble from '../components/SpeechBubble';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { playSound, startMusic } from '../utils/audioManager';

export default function Page1Rope({ onNext }) {
  const [ropePulled, setRopePulled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragY = useMotionValue(0);
  const ropeHeight = useTransform(dragY, [0, 200], [220, 420]);

  const handleDrag = (_, info) => {
    if (ropePulled) return;
    playSound.ropePull();
    if (info.offset.y > 130) {
      triggerRopeSuccess();
    }
  };

  const triggerRopeSuccess = () => {
    if (ropePulled) return;
    setRopePulled(true);
    playSound.sparkle();
    startMusic();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#fbbf24', '#fde68a', '#f472b6']
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-amber-950 via-forest-deep to-warm-darkwood px-4 py-8">
      <ParticleCanvas type="golden" density={35} />

      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-forest-green/60 blur-3xl" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-800/40 blur-3xl" />
      </div>

      {!ropePulled && (
        <div className="relative z-30 flex flex-col items-center pt-0">
          <motion.div
            style={{ height: ropeHeight }}
            className="w-3 rounded-b-full bg-gradient-to-b from-amber-800 via-amber-600 to-amber-400 shadow-2xl border border-amber-300/40"
          />

          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 180 }}
            dragElastic={0.1}
            style={{ y: dragY }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDrag}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-grab active:cursor-grabbing -mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-1 shadow-2xl border-2 border-amber-100 animate-pulse-glow"
          >
            <div className="h-8 w-8 rounded-full border-2 border-amber-950/40 bg-amber-400/80 flex items-center justify-center text-amber-950 font-bold text-xs">
              ✊
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-4 rounded-full bg-amber-950/80 px-4 py-1.5 text-xs font-bold tracking-widest text-amber-300 border border-amber-500/40 shadow-lg"
          >
            ↓ DRAG DOWN ↓
          </motion.div>
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center mb-8">
        <AnimatePresence>
          {!ropePulled && (
            <SpeechBubble
              text="Pssst… hey you 👀❤️"
              subtext="Pull the rope…"
              className="mb-4"
            />
          )}
        </AnimatePresence>

        <BearCharacter
          expression={isDragging ? 'pulling' : ropePulled ? 'happy' : 'curious'}
          scale={1.1}
        />
      </div>

      <AnimatePresence>
        {ropePulled && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-amber-950 via-warm-darkwood to-slate-950 p-6 text-center shadow-2xl border-b-4 border-amber-500/50"
          >
            <ParticleCanvas type="golden" density={50} />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-storybook text-xl md:text-2xl font-semibold tracking-widest text-amber-300/90 uppercase"
            >
              WELCOME TO OUR
            </motion.p>

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              className="mt-2 font-storybook text-5xl md:text-7xl font-extrabold tracking-wider text-amber-200 text-glow-gold drop-shadow-2xl"
            >
              LOVEVERSE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-4 max-w-md font-handwriting text-2xl md:text-3xl text-amber-100"
            >
              A little universe made from our memories… ❤️
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10"
            >
              <StoryButton onClick={onNext} variant="gold">
                ENTER OUR LOVEVERSE →
              </StoryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
