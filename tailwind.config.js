module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      custom: ['Kelly Slab', 'sans-serif'],
    },
    extend: {
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      },
      boxShadow: {
        'custom-green': '0px 0px 30px 4px rgba(25, 133, 95, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
