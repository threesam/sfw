import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'

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
  preprocess: [
    preprocess({
      postcss: true
    })
  ]
}

export default config
