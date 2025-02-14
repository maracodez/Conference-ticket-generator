/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        'custom': '650'
      },
      fontFamily: {
        'custom': ["'Poppins'", "sans-serif"]
      }
    },
  },
  plugins: [],
};

