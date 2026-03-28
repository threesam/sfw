import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $utils: 'src/lib/utils',
      $store: 'src/lib/store.ts',
      $types: 'src/app.d.ts'
    }
  },
  preprocess: [vitePreprocess()]
}

export default config
