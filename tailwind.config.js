/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // Need it to work with react-native-web
  ],
  theme: {
    colors: {
      green: "#0F7173",
      "off-white": "#E7ECEF",
      red: "#F05D5E",
      "french-gray": "#D3CDD7",
    },
    extend: {},
  },
  plugins: [],
};
