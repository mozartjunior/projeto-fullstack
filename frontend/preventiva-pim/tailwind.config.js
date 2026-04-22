/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'industrial-blue': '#001a33',
        'industrial-light': '#f0f2f5',
      }
    },
  },
  plugins: [],
}