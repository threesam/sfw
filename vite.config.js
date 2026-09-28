import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  // /_vercel/image only exists on Vercel; local dev/preview keep the original URL.
  define: { __VERCEL_IMAGES__: JSON.stringify(Boolean(process.env.VERCEL)) },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
