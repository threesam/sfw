import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      preprocess: [vitePreprocess()],
      adapter: adapter({
        // Pin the function runtime to the Node LTS line rather than inheriting
        // the adapter's default, which moves when the adapter is bumped. This
        // matches what is already deployed, so it locks behaviour in place
        // rather than changing it.
        runtime: 'nodejs24.x',

        // Printful product shots are ~100-270 KB PNGs served from a Cloudflare host
        // that sets a third-party __cf_bm cookie. Routing them through Vercel's
        // optimizer resizes them, serves AVIF/WebP, and keeps the cookie off the
        // page. sizes must include every width optimize() asks for.
        images: {
          sizes: [256, 640, 800],
          formats: ['image/avif', 'image/webp'],
          minimumCacheTTL: 2678400,
          domains: ['files.cdn.printful.com']
        }
      }),

      alias: {
        $components: 'src/lib/components',
        $utils: 'src/lib/utils',
        $store: 'src/lib/store.ts',
        $types: 'src/app.d.ts'
      }
    })
  ],
  // /_vercel/image only exists on Vercel; local dev/preview keep the original URL.
  define: { __VERCEL_IMAGES__: JSON.stringify(Boolean(process.env.VERCEL)) },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
