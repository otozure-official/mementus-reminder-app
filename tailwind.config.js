/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/*.{js,jsx}", "./src/components/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
