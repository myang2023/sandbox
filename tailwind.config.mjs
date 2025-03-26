/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-base', 'text-lg', 'text-xl', 'text-2xl',
    'tracking-normal', 'tracking-wider', 'tracking-widest',
    'leading-normal', 'leading-relaxed', 'leading-loose',
  ],
  theme: {
    extend: {
      colors: {
        light: "var(--color-light)",
        medium: "var(--color-medium)",
        base: "var(--color-base)",
        defaultBlack: '#020617', //slate-950
        defaultWhite: '#f8fafc' //slate-50


      },
      fontFamily: {
        sim: "var(--font-sim)",
        trad: "var(--font-trad)",
      },
    },
  },
  plugins: [],
};
