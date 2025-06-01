import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-pink": "#E91E63",
        "brand-pink-light": "#F06292",
        "brand-pink-dark": "#AD1457",
        "space-black": "#000000",
        "deep-space": "#1a0f2e",
        "chrome": "#C0C0C0",
        "electric-blue": "#00BCD4",
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        gothic: ['UnifrakturMaguntia', 'serif'], // For logo text
      },
      dropShadow: {
        'pink-glow': '0 0 10px rgba(233, 30, 99, 0.5)',
        'chrome': '0 0 10px rgba(192, 192, 192, 0.5)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'petal-fall': 'petal-fall 10s linear infinite',
        'bloom': 'bloom 2s ease-out forwards',
        'typewriter': 'typewriter 4s steps(44) 1s forwards, blink 1s step-end infinite',
        'magnetic': 'magnetic 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 0.5rem #E91E63)' },
          '50%': { filter: 'drop-shadow(0 0 1rem #E91E63)' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        bloom: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--mx, 0), var(--my, 0))' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #000000, #1a0f2e)',
        'pink-chrome': 'linear-gradient(45deg, #E91E63, #C0C0C0)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [aspectRatio],
  darkMode: 'class',
}