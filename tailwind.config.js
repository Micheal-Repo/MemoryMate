/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"rgba(230, 200, 28, 0.75)",
        error:"rgba(150, 120, 28, 1)",
        color1:"rgba(16, 15, 41, 0.5)",
        color2:"rgba(20, 15, 41, 0.8)",
        dark:"#3f0634",
        light:"#510843",
        vlight:"#510849",
        
      }
    },
  },
  plugins: [require("daisyui")],
}

