// Web Audio API Synthesizer & Music Controller

let audioCtx = null;
let bgMusic = null;
let isMusicPlaying = false;
let isMuted = false;
let volume = 0.5;
let ambientInterval = null;
let mp3Available = false;
let listeners = [];

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function subscribeMusicState(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function notifyListeners() {
  listeners.forEach((l) => l({ isPlaying: isMusicPlaying, isMuted, volume, mp3Available }));
}

// Romantic Ambient Music Box Synth (Fairytale Lullaby Fallback)
const romanticChords = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [196.00, 246.94, 293.66, 392.00], // Gmaj
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
];

let chordIdx = 0;
let noteIdx = 0;

function startAmbientSynth() {
  if (ambientInterval) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  ambientInterval = setInterval(() => {
    if (!isMusicPlaying || isMuted) return;
    try {
      const chord = romanticChords[chordIdx];
      const freq = chord[noteIdx % chord.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const targetGain = volume * 0.12;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.85);

      noteIdx++;
      if (noteIdx % 4 === 0) {
        chordIdx = (chordIdx + 1) % romanticChords.length;
      }
    } catch (e) {}
  }, 650);
}

function stopAmbientSynth() {
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
}

// Background Music Controller
export function initBackgroundMusic(url = "/assets/music/loveverse.mp3") {
  if (!bgMusic) {
    bgMusic = new Audio(url);
    bgMusic.loop = true;
    bgMusic.volume = volume;

    bgMusic.addEventListener('canplaythrough', () => {
      mp3Available = true;
      notifyListeners();
    });

    bgMusic.addEventListener('error', () => {
      mp3Available = false;
      notifyListeners();
    });
  }
  return bgMusic;
}

export function startMusic() {
  getAudioContext();
  if (!bgMusic) {
    initBackgroundMusic();
  }

  isMusicPlaying = true;
  notifyListeners();

  // Try playing MP3 first
  bgMusic.play().then(() => {
    mp3Available = true;
    stopAmbientSynth();
    notifyListeners();
  }).catch(() => {
    // If MP3 fails or missing, fallback to Ambient Fairytale Synth
    mp3Available = false;
    startAmbientSynth();
    notifyListeners();
  });
}

export function stopMusic() {
  isMusicPlaying = false;
  if (bgMusic) bgMusic.pause();
  stopAmbientSynth();
  notifyListeners();
}

export function toggleMusic() {
  if (isMusicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
  return isMusicPlaying;
}

export function setMusicVolume(val) {
  volume = val;
  if (bgMusic) bgMusic.volume = val;
  notifyListeners();
}

export function getMusicState() {
  return { isPlaying: isMusicPlaying, isMuted, volume, mp3Available };
}

// Sound Effects Synthesizer
export const playSound = {
  ropePull: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  },

  sparkle: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.45);
      });
    } catch (e) {}
  },

  honeyDrop: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  },

  flowerBloom: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const freqs = [329.63, 392.00, 493.88, 587.33, 659.25];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.65);
      });
    } catch (e) {}
  },

  starTwinkle: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  },

  buttonClick: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }
};
