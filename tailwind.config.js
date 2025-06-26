/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.html",
    "./pages/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#41B4B4",
        secondary: "#124751",
        dark_primary: "#123E51",
        accent: "#F9B233",
        orange: "#F8C625",
        orange_dark: "#E96024",
        dark: "#0D2B36",
        light: "#F8FAFC",
        body: "#FFFCF0"
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(26,73,82,0.08)',
      },
      borderRadius: {
        xl: '1.25rem',
      }
    },
  },
  plugins: [],
} 