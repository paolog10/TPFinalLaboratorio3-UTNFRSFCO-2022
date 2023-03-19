/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,tx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        fondo: "url('/src/assets/fondo.jpg')",
      },
    },
  },
  plugins: [],
};
