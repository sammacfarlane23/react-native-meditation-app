/** @type {import('tailwindcss').Config} */
const colors = require("./constants/colors.ts");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
