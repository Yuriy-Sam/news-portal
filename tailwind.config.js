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
          200: "#e0e0e0",
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
      gridTemplateColumns: {
        // 4: "repeat(4, 120px)",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        // 3: "repeat(3, minmax(300px, 500px) )",
        // Complex site-specific row configuration
        // 'layout': '200px minmax(900px, 1fr) 100px',
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },

        lg: { max: "1023px" },

        md: { max: "767px" },

        sm: { max: "639px" },
      },
    },
  },
  plugins: [],
};
