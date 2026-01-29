/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        raspberry: {
          50: '#FAEBF4',
          100: '#F5D6E8',
          200: '#EBADD1',
          300: '#E085BA',
          400: '#D65CA3',
          500: '#CC338C',
          600: '#A32970',
          700: '#7A1F54',
          800: '#521438',
          900: '#290A1C',
          950: '#1D0714',
        },
      },
      fontFamily: {
        sans: ['Lexend', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(236,72,153,0.5)",
      },
    },
  },
  plugins: [],
}