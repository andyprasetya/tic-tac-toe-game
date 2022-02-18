module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './main.js', 
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Lato', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
