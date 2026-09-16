import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BearCharacter from '../components/BearCharacter';
import SpeechBubble from '../components/SpeechBubble';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { loveverseData } from '../data/loveverseData';
import { playSound } from '../utils/audioManager';

export default function Page2HoneyTree({ onNext }) {
  const [hiveClicked, setHiveClicked] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleHiveClick = () => {
    if (hiveClicked) return;
    setHiveClicked(true);
    playSound.honeyDrop();

    // Trigger golden sparkles
    setTimeout(() => {
      playSound.sparkle();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#fbbf24', '#f59e0b', '#fef3c7']
      });
      setShowLetter(true);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-emerald-950 via-forest-deep to-amber-950 px-4 py-8 text-center">
      <ParticleCanvas type="leaves" density={25} />

      {/* Ancient Tree Canopy Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-emerald-900/60 to-transparent blur-md" />

      {/* Main Ancient Tree & Beehive Scene */}
      <div className="relative z-20 flex flex-col items-center mt-4">
        {/* Glowing Beehive at Tree Top */}
        <motion.div
          animate={hiveClicked ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.15, 1] } : { y: [0, -6, 0] }}
          transition={hiveClicked ? { duration: 0.8 } : { duration: 3, repeat: Infinity }}
          onClick={handleHiveClick}
          className="relative cursor-pointer group"
        >
          {/* Flying Bees around hive */}
          <div className="absolute -left-8 top-0 animate-bee-fly text-xl">🐝</div>
          <div className="absolute -right-8 top-4 animate-bee-fly text-xl" style={{ animationDelay: '1s' }}>🐝</div>

          {/* SVG Beehive */}
          <svg width="120" height="130" viewBox="0 0 100 110" fill="none" className="filter drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
            <path d="M 20 40 Q 50 10 80 40 C 90 55 90 75 80 90 Q 50 105 20 90 C 10 75 10 55 20 40 Z" fill="#f59e0b" />
            <ellipse cx="50" cy="35" rx="32" ry="12" fill="#fbbf24" />
            <ellipse cx="50" cy="50" rx="36" ry="12" fill="#d97706" />
            <ellipse cx="50" cy="65" rx="34" ry="12" fill="#f59e0b" />
            <ellipse cx="50" cy="80" rx="28" ry="10" fill="#b45309" />
            {/* Hive Entrance Hole */}
            <circle cx="50" cy="65" r="9" fill="#451a03" />
            {/* Honey Drip */}
            <path d="M 48 74 Q 50 88 52 74" fill="#fbbf24" />
          </svg>

          {/* Click the Hive glowing label */}
          {!hiveClicked && (
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-2 rounded-full bg-amber-500/90 px-3.5 py-1 text-xs font-bold tracking-widest text-amber-950 shadow-lg border border-amber-200"
            >
              🍯 CLICK THE HIVE
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bear Character & Speech Bubbles */}
      <div className="relative z-20 flex flex-col items-center mb-6">
        <AnimatePresence>
          {!showLetter && (
            <SpeechBubble
              text="Hey my love… 🥺❤️"
              subtext="Do you see that honey pot up there? There’s something inside it that belongs only to you… 🍯"
              className="mb-4 max-w-sm"
            />
          )}
        </AnimatePresence>

        <BearCharacter expression={hiveClicked ? 'happy' : 'curious'} scale={1.1} />
      </div>

      {/* Revealed Magical Parchment Letter Modal */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <div className="relative max-w-lg w-full rounded-3xl paper-texture p-6 md:p-8 text-amber-950 shadow-2xl border-4 border-amber-600/40">
              <div className="text-center font-storybook text-2xl md:text-3xl font-extrabold text-amber-900 tracking-wider">
                {loveverseData.honeyLetter.title}
              </div>

              <div className="mt-4 font-handwriting text-xl md:text-2xl leading-relaxed whitespace-pre-line text-left text-amber-950 font-medium">
                {loveverseData.honeyLetter.content}
              </div>

              <p className="mt-6 font-sans text-xs md:text-sm text-amber-800 text-center italic font-bold">
                There are more memories hidden in this forest…
              </p>

              <div className="mt-6 flex justify-center">
                <StoryButton onClick={onNext} variant="gold">
                  NEXT →
                </StoryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
