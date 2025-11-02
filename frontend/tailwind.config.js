// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        dmSans: ["'DM Sans'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
