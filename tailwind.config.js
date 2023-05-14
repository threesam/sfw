/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: "'Fredericka the Great', cursive",
				sans: "'Montserrat', sans-serif"
			},
			backgroundImage: {
				'gradient-fade': 'linear-gradient(180deg, transparent 40%, black)',
				'gradient-3':
					'radial-gradient(circle at top left,rgba(249, 200, 76, 0.55),transparent 80%),radial-gradient(circle at top right,rgba(96, 165, 250, 0.75),transparent 100%),radial-gradient(at bottom left,rgba(249, 168, 212, 0.75),transparent 100%),radial-gradient(at bottom right,rgba(249, 200, 76, 0.55),transparent 80%);'
			},
			colors: {
				primary: 'var(--primary)',
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
	plugins: []
}
