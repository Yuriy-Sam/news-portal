/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#000",
          600: "#666666",
          500: "#999999",
          400: "#b2b2b2",
          300: "#cccccc",
        },
      },
      keyframes: {
        "btn-anim": {
          "0%, 100%": { left: "-2.6rem", opacity: "0.5" },
          "15%": { left: "105%", opacity: "0" },
          "75%": { left: "-2.6rem", opacity: "0" },
          "100%": { left: "-2.6rem", opacity: "0" },
        },
      },
      animation: {
        "btn-anim": "btn-anim 5s linear infinite",
      },
      // backgroundImage: {
      //   pattern: "url('/pattern.png')",
      //   "hero-bg": "url('/hero-bg.png')",
      // },
    },
  },
  plugins: [],
};
