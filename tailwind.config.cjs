/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        "clamp-md": "clamp(20px, 6vw, 26px)",
        "clamp-sm": "clamp(18px, 5vw, 20px)",
      },
    },
  },
  variants: {},
  plugins: [],
};
