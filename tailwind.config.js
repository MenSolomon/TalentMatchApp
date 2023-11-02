/** @type {import('tailwindcss').Config} */

let spacingObject = [];

for (let i = 1; i < 30; i++) {
  spacingObject.push(`${i}vh`);
}

console.log(spacingObject);

const object = spacingObject.reduce((acc, item) => {
  acc[item] = item;
  return acc;
}, {});

console.log(object, "Object");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: object,
    },
  },
  plugins: [require("flowbite/plugin")],
};
