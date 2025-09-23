/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
            ind: {
              10: '#E5E2FF',
              90: '#2C2A4A',
            },
            gold: {
              10: '#F5D56A',
              90: '#D4AF37',
            },
            lav: {
              10: '#8F84C5',
              90: '#C3B6E0',
            },
            back: {
              10: '#F7F5F9',
              90: '#1A1824',
            },
          },
    },
  },
  plugins: [],
}
