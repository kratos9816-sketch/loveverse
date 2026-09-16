import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Fingerprint, Award, Heart, CheckCircle2 } from 'lucide-react';
import BearCharacter from '../components/BearCharacter';
import SpeechBubble from '../components/SpeechBubble';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { playSound } from '../utils/audioManager';

export default function ThumbprintCertificate({ onReplay }) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const startScan = () => {
    if (scanned || scanning) return;
    setScanning(true);
    playSound.honeyDrop();

    let p = 0;
    timerRef.current = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(timerRef.current);
        setScanning(false);
        setScanned(true);
        playSound.sparkle();

        // Explosion of confetti
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#fbbf24', '#f472b6', '#ec4899', '#ffffff']
        });
      }
    }, 80);
  };

  const cancelScan = () => {
    if (scanned) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setScanning(false);
    setProgress(0);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-amber-950 via-warm-darkwood to-slate-950 px-4 py-8 text-center text-amber-100">
      <ParticleCanvas type="hearts" density={40} />

      <AnimatePresence mode="wait">
        {!scanned ? (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-20 my-auto flex flex-col items-center max-w-md w-full px-4"
          >
            <div className="mb-4">
              <SpeechBubble
                text="One last sacred vow... 💍"
                subtext="Place your thumb finger here to sign our love contract!"
                className="w-full"
              />
            </div>

            <BearCharacter expression="curious" scale={1} className="my-2" />

            {/* Thumbprint Scanner Container */}
            <div className="mt-4 flex flex-col items-center">
              <motion.div
                onMouseDown={startScan}
                onMouseUp={cancelScan}
                onTouchStart={startScan}
                onTouchEnd={cancelScan}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex h-36 w-36 cursor-pointer items-center justify-center rounded-full border-4 transition-all duration-300 ${
                  scanning
                    ? 'border-pink-400 bg-pink-500/20 shadow-[0_0_40px_rgba(244,114,182,0.9)]'
                    : 'border-amber-400 bg-amber-500/20 shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-pulse-glow'
                }`}
              >
                <Fingerprint className={`h-24 w-24 transition-colors duration-300 ${scanning ? 'text-pink-300' : 'text-amber-300'}`} />

                {/* Laser Scanning Line */}
                {scanning && (
                  <motion.div
                    animate={{ y: [-40, 40, -40] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute h-1 w-28 bg-gradient-to-r from-transparent via-pink-300 to-transparent shadow-[0_0_15px_#f472b6]"
                  />
                )}
              </motion.div>

              <p className="mt-4 font-storybook text-sm font-bold tracking-widest text-amber-300 uppercase">
                {scanning ? `SCANNING THUMBPRINT... ${progress}%` : "PRESS & HOLD YOUR THUMB HERE 👆"}
              </p>

              {/* Progress Bar */}
              <div className="mt-3 h-2 w-48 overflow-hidden rounded-full bg-amber-950 border border-amber-500/40">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-pink-400 to-rose-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="certificate"
            initial={{ opacity: 0, scale: 0.7, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, type: 'spring' }}
            className="relative z-20 my-auto flex flex-col items-center max-w-2xl w-full rounded-3xl paper-texture p-6 md:p-10 shadow-2xl border-4 border-amber-600/60 text-amber-950"
          >
            {/* Certificate Header Banner */}
            <div className="flex items-center gap-2 text-amber-800">
              <Award className="h-8 w-8 text-amber-600" />
              <span className="font-storybook text-xs md:text-sm font-bold tracking-widest uppercase">
                OFFICIAL CERTIFICATE OF LOVE
              </span>
              <Award className="h-8 w-8 text-amber-600" />
            </div>

            <h1 className="mt-2 font-storybook text-3xl md:text-5xl font-extrabold text-amber-900 tracking-wider">
              MARRIAGE CERTIFICATE
            </h1>
            <p className="font-handwriting text-xl text-amber-800 italic">
              Issued in our little Loveverse for eternity
            </p>

            <div className="my-6 w-full border-y-2 border-amber-700/30 py-6 font-handwriting text-2xl md:text-3xl leading-relaxed text-amber-950">
              <p className="font-sans text-sm font-bold text-amber-800 uppercase tracking-widest mb-2">
                This certifies that:
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-4 font-storybook text-2xl md:text-3xl font-extrabold text-amber-900">
                <span className="bg-amber-200/80 px-4 py-1.5 rounded-xl border border-amber-400 shadow-sm">
                  Aghil Vikhraman
                </span>
                <Heart className="h-8 w-8 text-rose-600 fill-rose-600 animate-pulse" />
                <span className="bg-amber-200/80 px-4 py-1.5 rounded-xl border border-amber-400 shadow-sm">
                  Kirthikhaa
                </span>
              </div>

              {/* Big Flashing Declaration */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 p-4 text-white shadow-xl border-2 border-amber-200"
              >
                <p className="font-handwriting text-3xl md:text-4xl font-extrabold text-glow-gold drop-shadow-md">
                  “Now Aghil Vikhraman is unofficially your official husband Kirthikhaa!” 💍❤️🎉
                </p>
              </motion.div>
            </div>

            {/* Wax Seal Stamp & Signatures */}
            <div className="flex items-center justify-between w-full px-4 text-left">
              <div>
                <p className="font-handwriting text-lg text-amber-800">Witnessed by:</p>
                <p className="font-handwriting text-2xl font-bold text-amber-900">Winnie the Pooh 🐾</p>
              </div>

              {/* Wax Seal */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-700 text-amber-100 font-storybook font-extrabold text-lg shadow-lg border-2 border-rose-300">
                A + K
              </div>

              <div className="text-right">
                <p className="font-handwriting text-lg text-amber-800">Status:</p>
                <p className="font-sans text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> FOREVER SEALED
                </p>
              </div>
            </div>

            {/* Replay Button */}
            <div className="mt-8 flex justify-center">
              <StoryButton onClick={onReplay} variant="gold">
                🍯 REPLAY OUR LOVEVERSE
              </StoryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
