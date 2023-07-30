/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: "'Staatliches', monospace",
				sans: "'Montserrat', sans-serif",
				mono: "'Cherry', monospace"
			},
			backgroundImage: {
				'gradient-fade': 'linear-gradient(180deg, transparent 20%, black)',
				'gradient-3': `radial-gradient(circle at top left,var(--primary),transparent 80%),
					radial-gradient(circle at top right,rgba(226, 232, 240, 0.75),transparent 100%),
					radial-gradient(at bottom left,rgba(148, 163, 184, 0.75),transparent 100%),
					radial-gradient(at bottom right,var(--primary),transparent 80%);`
			},
			colors: {
				primary: 'var(--primary)',
				dark: '#111111',
				light: '#FCFCFC'
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
