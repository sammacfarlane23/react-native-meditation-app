/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        green: "#0F7173",
        "off-white": "#E7ECEF",
        red: "#F05D5E",
        "french-gray": "#D3CDD7",
        "medium-gray": "#111827",
        "dark-gray": "#030712",
      },
    },
  },
  plugins: [],
};
