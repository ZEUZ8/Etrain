/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Poppins']
      },
      colors:{
        'left-gradient':'#FF663B'
      }
    },
  },
  plugins: [],
}