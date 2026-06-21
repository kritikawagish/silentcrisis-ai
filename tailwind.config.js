/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmos: {
          void: '#0a0418',
          deep: '#13082e',
          surface: '#1d1240',
          elevated: '#2a1b56',
        },
        star: {
          bright: '#f4ecdf',
          dim: '#a89cc4',
          faint: '#6b5f8a',
        },
        amber: {
          dawn: '#ff9b6a',
          warm: '#ffb88c',
          glow: '#ffd4b0',
        },
        violet: {
          signal: '#a380ff',
          deep: '#7a5fd4',
        },
        aurora: {
          green: '#7fd9b8',
        },
        warn: {
          pink: '#ff6b8a',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '-0.02em',
        'wide-cosmic': '0.3em',
      },
      animation: {
        'breathe': 'breathe 8s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'scroll': 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scroll: {
          to: { transform: 'translate(calc(-50% - 0.5rem))' },
        },
      },
    },
  },
  plugins: [],
};
