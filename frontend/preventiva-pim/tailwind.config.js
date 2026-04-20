/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'industrial-blue': '#001a33',
        'industrial-light': '#f4f7f9',
      }
    },
  },
  plugins: [],
}