import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleMusic, setMusicVolume, getMusicState, subscribeMusicState } from '../utils/audioManager';

export default function MusicController() {
  const [musicState, setMusicState] = useState(getMusicState());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeMusicState((newState) => {
      setMusicState({ ...newState });
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    const isNowPlaying = toggleMusic();
    if (isNowPlaying && !musicState.mp3Available) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setMusicVolume(val);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-amber-950/80 p-2 text-amber-200 border border-amber-500/40 backdrop-blur-md shadow-2xl">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute top-12 right-0 w-64 rounded-xl bg-amber-950 border border-amber-500/50 p-3 text-xs text-amber-100 shadow-2xl"
          >
            🎵 Playing ambient fairytale lullaby! Add <code className="text-amber-300 font-bold">loveverse.mp3</code> to <code className="text-amber-300 font-bold">public/assets/music/</code> to play your custom MP3.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/30 text-amber-300 hover:bg-amber-500/50 border border-amber-400/30"
        title={musicState.isPlaying ? "Pause Music" : "Play Music"}
      >
        {musicState.isPlaying ? (
          <Music className="h-5 w-5 animate-pulse text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        ) : (
          <Play className="h-5 w-5 ml-0.5 text-amber-200" />
        )}
      </motion.button>

      <div className="hidden sm:flex items-center gap-2 px-2">
        <button
          onClick={() => {
            const nextVol = musicState.volume === 0 ? 0.5 : 0;
            setMusicVolume(nextVol);
          }}
          className="text-amber-300 hover:text-amber-100"
        >
          {musicState.volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={musicState.volume}
          onChange={handleVolumeChange}
          className="h-1.5 w-16 accent-amber-400 cursor-pointer bg-amber-900/60 rounded-lg"
        />
      </div>
    </div>
  );
}
