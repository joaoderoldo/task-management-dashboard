/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'default': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#365EFF',
        secondary: '#F3F4F7'
      }
    },
  },
  plugins: [],
}

