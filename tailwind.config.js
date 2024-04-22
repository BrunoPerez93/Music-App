/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'c-dark': '#212936',
      'c-white': '#E5E7EB',
      'c-gray': '#4D5562',
      'c-pink': '#C93B76',
    },
    extend: {},
  },
  plugins: [],
}

