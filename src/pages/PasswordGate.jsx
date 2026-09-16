import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import BearCharacter from '../components/BearCharacter';
import SpeechBubble from '../components/SpeechBubble';
import StoryButton from '../components/StoryButton';
import ParticleCanvas from '../components/ParticleCanvas';
import { playSound, startMusic } from '../utils/audioManager';

export default function PasswordGate({ onUnlock }) {
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = inputPassword.trim().toLowerCase();

    if (cleaned === 'wife') {
      playSound.sparkle();
      startMusic(); // Start background music on unlock
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f472b6']
      });
      onUnlock();
    } else {
      playSound.buttonClick();
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-amber-950 via-warm-darkwood to-slate-950 px-4 py-8 text-center text-amber-100 overflow-hidden">
      <ParticleCanvas type="golden" density={30} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { opacity: 1, scale: 1 }}
        transition={shake ? { duration: 0.5 } : { duration: 0.8 }}
        className="relative z-20 flex flex-col items-center max-w-md w-full rounded-3xl paper-texture p-6 md:p-8 shadow-2xl border-4 border-amber-600/50 text-amber-950"
      >
        <div className="mb-4">
          <SpeechBubble
            text="Wait a second! 🔑❤️"
            subtext="Only a very special person can unlock this universe..."
            className="w-full"
          />
        </div>

        <BearCharacter expression={error ? 'curious' : 'happy'} scale={1} className="my-2" />

        <h2 className="mt-4 font-storybook text-2xl md:text-3xl font-bold text-amber-900 tracking-wide">
          Unlock Our Loveverse
        </h2>
        <p className="mt-1 font-sans text-xs md:text-sm text-amber-800 font-medium">
          Hint: What are you to me? 💍
        </p>

        <form onSubmit={handleSubmit} className="mt-6 w-full flex flex-col items-center gap-4">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Enter secret word..."
            className="w-full rounded-full border-2 border-amber-600/60 bg-white/80 px-5 py-3 text-center font-bold text-amber-950 placeholder-amber-800/50 shadow-inner focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg tracking-widest"
            autoFocus
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300"
            >
              Oops! That's not it my love 🥺 (Hint: wife)
            </motion.p>
          )}

          <StoryButton type="submit" variant="gold" className="w-full mt-2">
            UNLOCK OUR LOVEVERSE 🔑
          </StoryButton>
        </form>
      </motion.div>
    </div>
  );
}
