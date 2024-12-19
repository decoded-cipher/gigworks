/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#F3F4F6', // background primary
        bgSecondary: '#DADBDD', // background secondary
        primary: '#111828', // button color / icon hover
        primary2: '#131F3A', // button color / icon hover
        secondary: '#263238', // button color / icon hover
        tertiary: '#A3A3A3', // button color / icon hover
        border: '#484848', // border / line color
        link: '#4A8FFF', // link color
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}