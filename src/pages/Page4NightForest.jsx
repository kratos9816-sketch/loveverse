import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BearCharacter from '../components/BearCharacter';
import SpeechBubble from '../components/SpeechBubble';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { loveverseData } from '../data/loveverseData';
import { playSound } from '../utils/audioManager';

export default function Page4NightForest({ onNext }) {
  const [clickedStars, setClickedStars] = useState({});
  const [activeWish, setActiveWish] = useState(null);
  const [finalClicked, setFinalClicked] = useState(false);

  const handleStarClick = (star) => {
    playSound.starTwinkle();
    setClickedStars((prev) => ({ ...prev, [star.id]: true }));
    setActiveWish(star.wish);
  };

  const handleFinalStarClick = () => {
    playSound.starTwinkle();
    playSound.sparkle();
    setFinalClicked(true);
    setActiveWish(loveverseData.finalStarWish);
  };

  const allStarsClicked = Object.keys(clickedStars).length === loveverseData.stars.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950 px-4 py-8 text-center">
      <ParticleCanvas type="night" density={40} />

      {/* Moon in Sky */}
      <div className="absolute top-6 left-8 pointer-events-none opacity-80">
        <div className="h-16 w-16 rounded-full bg-amber-100 shadow-[0_0_35px_rgba(254,243,199,0.9)]" />
      </div>

      {/* Intro Header */}
      <div className="relative z-20 flex flex-col items-center mt-4 max-w-sm">
        <SpeechBubble
          text="You know what I wish for when I look at the stars? ✨"
          subtext="Tap the stars above to see each wish..."
        />
      </div>

      {/* Interactive Constellation Stars Grid */}
      <div className="relative z-20 my-6 flex w-full max-w-xl flex-wrap items-center justify-center gap-6 md:gap-10">
        {loveverseData.stars.map((star, idx) => {
          const isClicked = clickedStars[star.id];
          return (
            <motion.button
              key={star.id}
              whileHover={{ scale: 1.25, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStarClick(star)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                isClicked ? 'bg-amber-400/40 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.9)]' : 'bg-slate-800/60 text-slate-400'
              }`}>
                <span className="text-2xl">⭐</span>
              </div>
              <span className="mt-1 text-[11px] font-bold tracking-wider text-amber-300/80">
                STAR 0{star.id}
              </span>
            </motion.button>
          );
        })}

        {/* Huge Final Star - unlocks when all stars are clicked or available */}
        {allStarsClicked && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={handleFinalStarClick}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 shadow-[0_0_35px_rgba(251,191,36,1)] border-2 border-white">
              <span className="text-4xl">🌟</span>
            </div>
            <span className="mt-1 text-xs font-bold text-amber-200 tracking-widest text-glow-gold">
              FINAL WISH
            </span>
          </motion.button>
        )}
      </div>

      {/* Display Current Active Wish Popup / Banner */}
      <AnimatePresence mode="wait">
        {activeWish && (
          <motion.div
            key={activeWish}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="relative z-30 max-w-md rounded-2xl bg-amber-950/80 border border-amber-500/50 p-4 shadow-2xl backdrop-blur-md"
          >
            <p className="font-handwriting text-2xl md:text-3xl font-bold text-amber-200">
              “{activeWish}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion & Next Page Button */}
      {finalClicked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 mb-4 max-w-md flex flex-col items-center gap-3"
        >
          <p className="font-sans text-sm text-amber-300 italic">
            Some wishes are too precious to leave to the stars… ❤️
          </p>
          <StoryButton onClick={onNext} variant="gold">
            NEXT →
          </StoryButton>
        </motion.div>
      )}

      {/* Bear Stargazing Under Tree */}
      <div className="relative z-20 mb-4">
        <BearCharacter expression="starGazing" scale={1.1} />
      </div>
    </div>
  );
}
