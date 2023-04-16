/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-fade': 'linear-gradient(180deg, transparent 60%, black)'
      }
    },
  },
  plugins: [],
}

