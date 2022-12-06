const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      balsamic: ["Balsamiq Sans", "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
