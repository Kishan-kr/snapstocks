/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#07A081',
        'gray-light': '#858585',
        'gray-dark': '#2C343E'
      },
      fontFamily: {
        'comfortaa': 'Comfortaa, sans-serif'
      },
      screens: {
        slg: '992px'
      }
    },
  },
  plugins: [],
}
