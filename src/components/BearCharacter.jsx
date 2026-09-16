import React from 'react';
import { motion } from 'framer-motion';

/**
 * Winnie the Pooh Character Component
 * Classic honey-yellow bear with his iconic red t-shirt and "HUNNY" pot.
 * Supported expressions: 'curious', 'pulling', 'happy', 'sitting', 'starGazing'
 */
export default function BearCharacter({ expression = 'curious', className = '', scale = 1 }) {
  const renderEyes = () => {
    switch (expression) {
      case 'starGazing':
      case 'curious':
        return (
          <g>
            {/* Big curious eyes looking up */}
            <circle cx="36" cy="42" r="4.5" fill="#1c1917" />
            <circle cx="64" cy="42" r="4.5" fill="#1c1917" />
            <circle cx="34" cy="40" r="1.8" fill="#ffffff" />
            <circle cx="62" cy="40" r="1.8" fill="#ffffff" />
            {/* Pooh's cute eyebrows */}
            <path d="M 30 33 Q 36 29 42 33" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 58 33 Q 64 29 70 33" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );
      case 'pulling':
        return (
          <g>
            {/* Determined Pooh eyes */}
            <circle cx="36" cy="44" r="4" fill="#1c1917" />
            <circle cx="64" cy="44" r="4" fill="#1c1917" />
            <circle cx="34" cy="42" r="1.5" fill="#ffffff" />
            <circle cx="62" cy="42" r="1.5" fill="#ffffff" />
            <path d="M 30 36 L 42 40" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 70 36 L 58 40" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
      case 'happy':
      default:
        return (
          <g>
            {/* Happy Pooh arch eyes */}
            <path d="M 31 43 Q 36 37 41 43" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 59 43 Q 64 37 69 43" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 30 34 Q 36 30 42 34" stroke="#44403c" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 58 34 Q 64 30 70 34" stroke="#44403c" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );
    }
  };

  const renderMouth = () => {
    if (expression === 'pulling') {
      return <ellipse cx="50" cy="56" rx="4" ry="5" fill="#78350f" />;
    }
    return <path d="M 43 53 Q 50 60 57 53" stroke="#1c1917" strokeWidth="2.8" strokeLinecap="round" fill="none" />;
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ transform: `scale(${scale})` }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="140" height="160" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Pooh Golden-Yellow Fur Gradients */}
          <radialGradient id="poohFur" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="75%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          {/* Pooh Red T-Shirt Gradient */}
          <linearGradient id="poohShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          {/* Honey Pot Gradient */}
          <linearGradient id="hunnyPot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {/* Pooh Round Golden Ears */}
        <motion.circle
          cx="22" cy="22" r="13" fill="url(#poohFur)"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="22" cy="22" r="7" fill="#fef08a" opacity="0.6" />

        <motion.circle
          cx="78" cy="22" r="13" fill="url(#poohFur)"
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="78" cy="22" r="7" fill="#fef08a" opacity="0.6" />

        {/* Pooh Body (Lower tummy) */}
        <ellipse cx="50" cy="85" rx="35" ry="28" fill="url(#poohFur)" />

        {/* Iconic Red Pooh T-Shirt */}
        <path d="M 20 68 C 20 62, 35 58, 50 58 C 65 58, 80 62, 80 68 L 84 82 C 84 86, 75 90, 50 90 C 25 90, 16 86, 16 82 Z" fill="url(#poohShirt)" />
        {/* Shirt Collar detail */}
        <path d="M 40 59 Q 50 65 60 59" stroke="#991b1b" strokeWidth="2.5" fill="none" />

        {/* Pooh Arms */}
        {expression === 'pulling' ? (
          <g>
            {/* Reaching up */}
            <path d="M 22 66 C 15 55, 25 45, 30 42" stroke="url(#poohFur)" strokeWidth="13" strokeLinecap="round" />
            <path d="M 78 66 C 85 55, 75 45, 70 42" stroke="url(#poohFur)" strokeWidth="13" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            {/* Resting arms with red shirt sleeves */}
            <path d="M 22 70 C 14 75, 18 85, 28 86" stroke="url(#poohFur)" strokeWidth="11" strokeLinecap="round" />
            <path d="M 78 70 C 86 75, 82 85, 72 86" stroke="url(#poohFur)" strokeWidth="11" strokeLinecap="round" />
            {/* Red sleeves */}
            <ellipse cx="23" cy="71" rx="6" ry="7" fill="url(#poohShirt)" />
            <ellipse cx="77" cy="71" rx="6" ry="7" fill="url(#poohShirt)" />
          </g>
        )}

        {/* Pooh Head */}
        <circle cx="50" cy="45" r="31" fill="url(#poohFur)" />

        {/* Muzzle Area */}
        <ellipse cx="50" cy="51" rx="14" ry="9" fill="#fef08a" opacity="0.6" />
        {/* Black Oval Nose */}
        <ellipse cx="50" cy="47" rx="4.5" ry="3.5" fill="#1c1917" />

        {/* Eyes & Mouth */}
        {renderEyes()}
        {renderMouth()}

        {/* Pooh Cheek Blush */}
        <circle cx="25" cy="49" r="4.5" fill="#f472b6" opacity="0.45" />
        <circle cx="75" cy="49" r="4.5" fill="#f472b6" opacity="0.45" />

        {/* Iconic "HUNNY" Pot */}
        {expression === 'happy' && (
          <g transform="translate(60, 72) scale(0.65)">
            {/* Pot Body */}
            <rect x="0" y="8" width="28" height="26" rx="8" fill="url(#hunnyPot)" stroke="#1e3a8a" strokeWidth="1.5" />
            {/* Dripping Yellow Honey */}
            <ellipse cx="14" cy="8" rx="14" ry="5" fill="#f59e0b" />
            <path d="M 6 12 Q 9 20 12 12" fill="#f59e0b" />
            {/* "HUNNY" handwritten text */}
            <text x="4" y="24" fontSize="8" fill="#ffffff" fontWeight="bold" fontFamily="sans-serif">HUNNY</text>
          </g>
        )}
      </svg>
    </motion.div>
  );
}
