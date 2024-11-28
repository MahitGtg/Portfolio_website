/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Noto Sans", "sans-serif"],
        secondary: ["Courier Prime", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        navy: {
          50: '#F0F3F9',
          100: '#E1E7F0',
          200: '#C3CFE0',
          300: '#9FB1CC',
          400: '#7B93B8',
          500: '#5775A4',
          600: '#435C89',
          700: '#344869',
          800: '#0E1636', // Your selected color
          900: '#0A1022',
        },
        slate: {
          150: '#EDF2F7',
        },
        tech: {
          bg: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(255, 255, 255, 0.2)',
          hover: 'rgba(255, 255, 255, 0.95)',
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}