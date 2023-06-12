/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        "hero-clamp": "clamp(340px, 40vw, 500px)",
      },
      fontSize: {
        "clamp-md": "clamp(20px, 6vw, 26px)",
        "clamp-sm": "clamp(18px, 5vw, 20px)",
      },
      dropShadow: {
        custom: "1px 1px 2px #000",
      },
      colors: {
        "just-black": "#000",
        "just-white": "#fff",
        "main-button": "#F13030",
        // Light Mode
        "light-blue": "#479EF9",
        // Dark Mode
        "dark-blue": "#003369",
      },
    },
  },
  variants: {},
  plugins: [],
};
