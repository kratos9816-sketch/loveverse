/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        warm: {
          cream: '#fffdf5',
          paper: '#faf4e6',
          parchment: '#f4ebd0',
          wood: '#3b2416',
          darkwood: '#25160c',
        },
        forest: {
          deep: '#0a1d12',
          night: '#08140c',
          green: '#1b4332',
          moss: '#2d6a4f',
          leaf: '#52b788',
        }
      },
      fontFamily: {
        storybook: ['"Cinzel"', '"Playfair Display"', 'serif'],
        handwriting: ['"Caveat"', '"Dancing Script"', 'cursive'],
        sans: ['"Quicksand"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'bee-fly': 'beeFly 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 1))' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        beeFly: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(8px, -10px) rotate(5deg)' },
          '50%': { transform: 'translate(-5px, -15px) rotate(-3deg)' },
          '75%': { transform: 'translate(-10px, -5px) rotate(4deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      }
    },
  },
  plugins: [],
}
