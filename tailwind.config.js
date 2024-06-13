/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        main: "#ffa001",
      },
      fontFamily: {
        pblack: ["Poppins-Black", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pthin: ["Poppins-Thin", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pitalic: ["Poppins-Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
