/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bestosyellow: "#f6e701",
        bestosblue: "#0b0149",
        bestoswhite: "#ffffff",
        beentoslightblue: "#2D3A50",
        lightyellow: "#F5E04A",
      }
    },
  },
  plugins: [],
}