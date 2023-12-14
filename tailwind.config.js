/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '50%' :  {opacity: .7}
        }
      },
      animation: {
        blinking: 'blink 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;'
      }
    },
  },
  plugins: [],
}

