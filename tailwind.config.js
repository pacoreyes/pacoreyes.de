module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './src/**/*.mjs', './src/**/*.njk'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // You can define your own color palette here
        'black': '#000000',
        'white': '#ffffff',
        'grey-lightest': '#f8f9fa',
        'grey-lighter': '#e9ecef',
        'grey-light': '#dee2e6',
        'grey': '#ced4da',
        'grey-dark': '#868e96',
        'grey-darker': '#495057',
        'grey-darkest': '#343a40',
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}