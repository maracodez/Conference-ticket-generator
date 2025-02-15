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
      },
      screens: {
        sm: '640px',
        md: '768px',
        xl: '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [],
};

