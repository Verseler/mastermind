/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nb-blue' : '#3300FF',
        'nb-pink': '#FF00f5',
        'nb-yellow' : '#FFFF00',
        'nb-red' : '#FF4911',
        'nb-green' : '#2FFF2F',
        'nb-orange' : '#ffbf00',
      },
      gridTemplateColumns: {
        'main' : 'minmax(200px, 1fr) minmax(50px, 150px)'
      },
      keyframes: {
        blink: {
          '50%' :  {borderColor: 'rgb(245 158 11)'}
        },
      },
      animation: {
        blinking: 'blink 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      }
    },
  },
  plugins: [],
  darkMode: 'false',
}

