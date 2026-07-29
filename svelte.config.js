import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Pin the function runtime to the Node LTS line rather than inheriting
			// the adapter's default, which moves when the adapter is bumped. This
			// matches what is already deployed, so it locks behaviour in place
			// rather than changing it.
			runtime: 'nodejs24.x',
		}),
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/utils',
			$store: 'src/lib/store.ts',
			$types: 'src/app.d.ts',
		},
	},
	preprocess: [vitePreprocess()],
}

export default config
