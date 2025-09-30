/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3597D5",
          200: "#2B7DB1"
        },
        palette: {
          gray: {
            50: "#EDEAF4",
            100: "#555B64"
          }
        }
      }
    },
    plugins: []
  }
};
