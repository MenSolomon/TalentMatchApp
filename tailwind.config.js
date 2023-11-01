/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "1vh": "1vh",
        "2vh": "2vh",

        // Add more as needed
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
