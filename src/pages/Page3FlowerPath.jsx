import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BearCharacter from '../components/BearCharacter';
import SpeechBubble from '../components/SpeechBubble';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { loveverseData } from '../data/loveverseData';
import { playSound } from '../utils/audioManager';

export default function Page3FlowerPath({ onNext }) {
  const [openedFlowers, setOpenedFlowers] = useState({});
  const [selectedFlower, setSelectedFlower] = useState(null);

  const handleFlowerClick = (flower) => {
    playSound.flowerBloom();
    setOpenedFlowers((prev) => ({ ...prev, [flower.id]: true }));
    setSelectedFlower(flower);
  };

  const allOpened = Object.keys(openedFlowers).length === loveverseData.flowers.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-teal-950 via-emerald-950 to-amber-950 px-4 py-8 text-center">
      <ParticleCanvas type="leaves" density={30} />

      {/* Header speech bubble */}
      <div className="relative z-20 flex flex-col items-center mt-2 max-w-sm">
        <SpeechBubble
          text="Come on, love…"
          subtext="I want to show you something along this flower path. Touch each blossom 🌸"
        />
      </div>

      {/* Winding Flower Path Meadow */}
      <div className="relative z-20 my-6 flex w-full max-w-2xl flex-wrap items-center justify-around gap-6 px-4">
        {loveverseData.flowers.map((flower, idx) => {
          const isOpened = openedFlowers[flower.id];
          return (
            <motion.div
              key={flower.id}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlowerClick(flower)}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* SVG Glowing Flower Blossom */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                className={`relative flex h-24 w-24 items-center justify-center rounded-full p-2 transition-all duration-300 ${
                  isOpened ? 'bg-pink-500/30 border-2 border-pink-300 shadow-[0_0_25px_rgba(244,114,182,0.8)]' : 'bg-amber-500/20 border border-amber-400/40'
                }`}
              >
                <span className="text-4xl filter drop-shadow">
                  {isOpened ? '🌸' : '🌺'}
                </span>
              </motion.div>

              <span className={`mt-2 font-storybook text-sm font-bold tracking-wider ${isOpened ? 'text-pink-300 text-glow-heart' : 'text-amber-200'}`}>
                {flower.title}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Heart / Completion Banner when all 3 opened */}
      <AnimatePresence>
        {allOpened && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-30 mb-4 max-w-md rounded-2xl bg-amber-950/80 border-2 border-pink-400/60 p-4 shadow-2xl backdrop-blur-md"
          >
            <p className="font-handwriting text-2xl md:text-3xl font-bold text-pink-200">
              “Every little thing about you became part of my world.” ❤️
            </p>
            <div className="mt-4 flex justify-center">
              <StoryButton onClick={onNext} variant="rose">
                NEXT →
              </StoryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bear Walking along path */}
      <div className="relative z-20 mb-4">
        <BearCharacter expression={allOpened ? 'happy' : 'curious'} scale={1.05} />
      </div>

      {/* Flower Text Reveal Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedFlower(null)}
          >
            <div
              className="relative max-w-md w-full rounded-3xl paper-texture p-6 text-amber-950 shadow-2xl border-4 border-pink-500/40 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-5xl block mb-2">🌸</span>
              <h3 className="font-storybook text-2xl font-bold text-pink-900 tracking-wider">
                {selectedFlower.title}
              </h3>
              <p className="mt-4 font-handwriting text-2xl leading-relaxed whitespace-pre-line text-amber-950 font-medium">
                {selectedFlower.text}
              </p>
              <button
                onClick={() => setSelectedFlower(null)}
                className="mt-6 rounded-full bg-pink-600 px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-pink-500"
              >
                CLOSE 💖
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
