/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'display': "'Fredericka the Great', cursive",
        'sans': "'Montserrat', sans-serif"
      },
      backgroundImage: {
        'gradient-fade': 'linear-gradient(180deg, transparent 60%, black)'
      },
      colors: {
        primary: 'var(--primary)',
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        beige: '#d2b097',
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA'
      }
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman'
    }
  },
  plugins: [],
}

