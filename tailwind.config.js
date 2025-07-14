import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
      DancingScript: ["DancingScript", "sans-serif"],
    },
    extend: {},
  },
  plugins: [typography],
};
