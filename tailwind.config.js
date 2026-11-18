/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arc: {
          light: '#72f3ff',
          DEFAULT: '#00f0ff',
          glow: '#00d2ff',
          deep: '#0077b6',
          dark: '#03045e'
        },
        stark: {
          crimson: '#dc2626',
          blood: '#991b1b',
          gold: '#fbbf24',
          amber: '#f59e0b',
          dark: '#060913',
          card: '#0c1324',
          plate: '#121c33',
          border: 'rgba(0, 240, 255, 0.25)',
          borderGold: 'rgba(251, 191, 36, 0.25)',
        }
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        sans: ['"Roboto"', 'sans-serif'],
        mono: ['"Barlow"', 'sans-serif'],
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' }
        },
        'arc-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.7))' },
          '50%': { transform: 'scale(1.06)', opacity: '1', filter: 'drop-shadow(0 0 35px rgba(0,240,255,1))' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        'hologram-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.92' },
          '70%': { opacity: '0.98' },
          '85%': { opacity: '0.94' }
        }
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'arc-pulse': 'arc-pulse 3s ease-in-out infinite',
        'scanline': 'scanline 10s linear infinite',
        'hologram': 'hologram-flicker 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
