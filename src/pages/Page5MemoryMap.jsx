import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Film, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { loveverseData } from '../data/loveverseData';
import { playSound } from '../utils/audioManager';

export default function Page5MemoryMap({ onNext }) {
  const [visitedDates, setVisitedDates] = useState({});
  const [activeDate, setActiveDate] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const handlePinClick = (dateObj) => {
    playSound.buttonClick();
    setVisitedDates((prev) => ({ ...prev, [dateObj.id]: true }));
    setActiveDate(dateObj);
    setActiveMediaIndex(0);
  };

  const completedAll = Object.keys(visitedDates).length === loveverseData.dates.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-amber-950 via-warm-darkwood to-slate-950 px-4 py-8 text-center">
      <ParticleCanvas type="golden" density={30} />

      {/* Title Header */}
      <div className="relative z-20 mt-2">
        <h2 className="font-storybook text-3xl md:text-5xl font-extrabold text-amber-200 text-glow-gold tracking-wider">
          OUR LITTLE STORY
        </h2>
        <p className="mt-1 font-handwriting text-2xl text-amber-300">
          An adventure written across 5 unforgettable dates… ✨
        </p>
      </div>

      {/* Storybook Adventure Map Canvas */}
      <div className="relative z-20 my-6 flex min-h-[380px] w-full max-w-3xl items-center justify-center rounded-3xl paper-texture p-6 shadow-2xl border-4 border-amber-600/40 overflow-hidden">
        {/* Decorative Map Grid & Paths */}
        <svg className="absolute inset-0 h-full w-full opacity-25 pointer-events-none stroke-amber-900" strokeWidth="2" strokeDasharray="6 6">
          <path d="M 100 100 C 200 50, 400 250, 600 120" fill="none" />
          <path d="M 150 280 C 300 350, 500 200, 650 300" fill="none" />
        </svg>

        {/* 5 Map Location Pins */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full">
          {loveverseData.dates.map((item, idx) => {
            const isVisited = visitedDates[item.id];
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1, y: -6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePinClick(item)}
                className={`flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isVisited ? 'bg-amber-500/20 border-2 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.6)]' : 'bg-warm-darkwood/60 border border-amber-700/40'
                }`}
              >
                <div className="relative mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 text-amber-950 shadow-lg">
                  <MapPin className="h-6 w-6" />
                  {isVisited && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] text-white font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="font-storybook text-sm font-bold text-amber-900 tracking-wider">
                  {item.title}
                </span>
                <span className="mt-1 text-[11px] font-sans text-amber-800 font-medium line-clamp-1">
                  {item.subtitle}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Completion Banner after exploring all 5 dates */}
      {completedAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 mb-4 flex flex-col items-center gap-3 max-w-md rounded-2xl bg-amber-950/80 border border-amber-400/50 p-4 shadow-2xl backdrop-blur-md"
        >
          <p className="font-handwriting text-2xl text-amber-200">
            “Five dates… Countless little moments… One story that means everything to me.” ❤️
          </p>
          <StoryButton onClick={onNext} variant="gold">
            NEXT →
          </StoryButton>
        </motion.div>
      )}

      {/* Date Memory Lightbox / Modal */}
      <AnimatePresence>
        {activeDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveDate(null)}
          >
            <div
              className="relative max-w-2xl w-full rounded-3xl bg-warm-darkwood p-6 text-amber-100 shadow-2xl border-2 border-amber-500/40 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDate(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-amber-950/80 text-amber-200 hover:bg-amber-800"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-storybook text-2xl md:text-3xl font-bold text-amber-300">
                {activeDate.title} — {activeDate.subtitle}
              </h3>
              <p className="mt-2 font-sans text-xs md:text-sm text-amber-200/80 italic">
                {activeDate.description}
              </p>

              {/* Active Media Display Frame */}
              <div className="relative mt-4 flex h-64 md:h-80 w-full items-center justify-center rounded-2xl bg-black/60 overflow-hidden border border-amber-500/30">
                {activeDate.media[activeMediaIndex].type === 'video' ? (
                  <video
                    src={activeDate.media[activeMediaIndex].src}
                    controls
                    autoPlay
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={activeDate.media[activeMediaIndex].src}
                    alt={activeDate.media[activeMediaIndex].caption}
                    className="h-full w-full object-contain"
                  />
                )}

                {/* Carousel Prev/Next Controls */}
                {activeDate.media.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveMediaIndex((prev) =>
                          prev === 0 ? activeDate.media.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveMediaIndex((prev) =>
                          prev === activeDate.media.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Bar */}
              <div className="mt-3 flex items-center justify-between text-xs text-amber-300">
                <span className="font-handwriting text-xl text-amber-200">
                  {activeDate.media[activeMediaIndex].caption}
                </span>
                <span>
                  {activeMediaIndex + 1} / {activeDate.media.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
