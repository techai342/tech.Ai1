/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#4b6bfb',
        neonPurple: '#8e44ad',
        deepBlue: '#0f172a',
      },
      boxShadow: {
        glow: '0 0 20px rgba(79, 70, 229, 0.6)',
      },
    },
  },
  plugins: [],
}

