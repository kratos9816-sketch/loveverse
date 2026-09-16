import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { loveverseData } from '../data/loveverseData';
import { playSound } from '../utils/audioManager';

export default function Page8HandwrittenLetter({ onNext }) {
  const [visibleLines, setVisibleLines] = useState(1);
  const totalLines = loveverseData.handwrittenLetter.paragraphs.length;

  useEffect(() => {
    playSound.starTwinkle();
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < totalLines) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [totalLines]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden paper-texture px-4 py-8 text-amber-950">
      <ParticleCanvas type="golden" density={20} />

      {/* Parchment Container */}
      <div className="relative z-20 my-auto w-full max-w-2xl rounded-3xl bg-warm-cream/90 p-6 md:p-10 shadow-2xl border-4 border-amber-700/40 text-left">
        {/* Decorative Flower Accents */}
        <div className="absolute top-4 right-4 text-3xl opacity-80">🌸</div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-80">🌺</div>

        <h2 className="font-storybook text-3xl md:text-4xl font-extrabold text-amber-900 tracking-wider text-center">
          MY SWEETHEART ❤️
        </h2>

        <p className="mt-4 font-handwriting text-2xl font-bold text-amber-900">
          {loveverseData.handwrittenLetter.salutation}
        </p>

        <div className="mt-4 space-y-3 font-handwriting text-xl md:text-2xl leading-relaxed text-amber-950 font-medium">
          {loveverseData.handwrittenLetter.paragraphs.slice(0, visibleLines).map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {visibleLines >= totalLines && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 border-t border-amber-800/20 pt-4 text-right"
          >
            <p className="font-handwriting text-xl text-amber-900">
              {loveverseData.handwrittenLetter.closing}
            </p>
            <p className="font-handwriting text-3xl font-bold text-amber-950 mt-1">
              {loveverseData.handwrittenLetter.signature}
            </p>

            <div className="mt-8 flex justify-center">
              <StoryButton onClick={onNext} variant="gold">
                CONTINUE TO OUR LOVEVERSE →
              </StoryButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
