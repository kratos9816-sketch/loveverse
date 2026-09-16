import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { loveverseData } from '../data/loveverseData';
import { playSound } from '../utils/audioManager';

export default function Page6MemoryGarden({ onNext }) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  const handleMediaClick = (idx) => {
    playSound.buttonClick();
    setSelectedMediaIndex(idx);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-forest-deep via-emerald-950 to-amber-950 px-4 py-8 text-center">
      <ParticleCanvas type="leaves" density={30} />

      {/* Center Quote Banner */}
      <div className="relative z-20 mt-2 max-w-xl rounded-2xl bg-amber-950/70 p-4 border border-amber-500/30 backdrop-blur-md shadow-xl">
        <p className="font-handwriting text-2xl md:text-3xl font-semibold text-amber-100">
          “Every picture has a memory. Every memory has a feeling. And every feeling somehow leads me back to you.” ❤️
        </p>
      </div>

      {/* Floating Polaroid Memory Cards Grid */}
      <div className="relative z-20 my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl px-4">
        {loveverseData.generalMemories.map((item, idx) => (
          <motion.div
            key={item.id}
            style={{ rotate: `${item.rotation || 0}deg` }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMediaClick(idx)}
            className="cursor-pointer rounded-2xl bg-warm-cream p-2.5 shadow-2xl border-2 border-amber-300/40 text-amber-950 transition-all duration-300"
          >
            <div className="h-32 sm:h-40 w-full overflow-hidden rounded-xl bg-amber-900/10">
              {item.type === 'video' ? (
                <div className="relative h-full w-full bg-black flex items-center justify-center">
                  <video src={item.src} className="h-full w-full object-cover opacity-80" />
                  <span className="absolute text-3xl">🎥</span>
                </div>
              ) : (
                <img src={item.src} alt={item.caption} className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-2 font-handwriting text-base font-bold truncate text-amber-950">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Next Scene Button */}
      <div className="relative z-20 mb-4">
        <StoryButton onClick={onNext} variant="gold">
          NEXT →
        </StoryButton>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedMediaIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedMediaIndex(null)}
          >
            <div
              className="relative max-w-3xl w-full rounded-3xl bg-warm-darkwood p-4 md:p-6 text-amber-100 shadow-2xl border-2 border-amber-500/40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMediaIndex(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 text-amber-200 hover:bg-amber-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex h-[65vh] w-full items-center justify-center rounded-2xl bg-black overflow-hidden border border-amber-500/30">
                {loveverseData.generalMemories[selectedMediaIndex].type === 'video' ? (
                  <video
                    src={loveverseData.generalMemories[selectedMediaIndex].src}
                    controls
                    autoPlay
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={loveverseData.generalMemories[selectedMediaIndex].src}
                    alt={loveverseData.generalMemories[selectedMediaIndex].caption}
                    className="h-full w-full object-contain"
                  />
                )}

                {/* Swipe/Click Navigation */}
                <button
                  onClick={() =>
                    setSelectedMediaIndex((prev) =>
                      prev === 0 ? loveverseData.generalMemories.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() =>
                    setSelectedMediaIndex((prev) =>
                      prev === loveverseData.generalMemories.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <p className="mt-3 text-center font-handwriting text-2xl text-amber-200">
                {loveverseData.generalMemories[selectedMediaIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
