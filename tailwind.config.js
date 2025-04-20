/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5F35F5',
        'pbg': '#f8f8f8',
        'bdr': '#d1d1d1',
        'semi-black': '#575757',
        'semi-white': '#f3f3f3',
      },
      boxShadow: {
        'ownshadow': '0 0px 8px 0px #272727',
      }
    },
    fontFamily:{
      'nunito' : ['Nunito', 'sans-serif'],
      'poppin' : ['Poppins', 'sans-serif'],
    },
    screens: {
      'mobile': '300px',
      // => @media (min-width: 300px) { ... }
      'large_mobile': '450px',
      // => @media (min-width: 450px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'large_tablet': '800px',
      // => @media (min-width: 640px) { ... }
      'laptop': '910px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1100px',
      // => @media (min-width: 1280px) { ... }
    },


  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
