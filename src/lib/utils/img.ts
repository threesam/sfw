/**
 * Sanity CDN URLs get resize/format params. Printful URLs go through Vercel's
 * image optimizer when deployed there (w must be one of the sizes in
 * svelte.config.js). Anything else is returned untouched.
 */
export function optimize(
  src: string | null | undefined,
  opts: { w?: number; q?: number; format?: 'auto' | 'webp' } = {}
): string | undefined {
  if (!src) return undefined
  if (src.startsWith('https://files.cdn.printful.com/')) {
    if (!__VERCEL_IMAGES__ || !opts.w) return src
    return `/_vercel/image?url=${encodeURIComponent(src)}&w=${opts.w}&q=${opts.q ?? 75}`
  }
  if (!src.includes('cdn.sanity.io')) return src
  const u = new URL(src)
  if (opts.w) u.searchParams.set('w', String(opts.w))
  if (opts.q) u.searchParams.set('q', String(opts.q))
  u.searchParams.set('auto', opts.format ?? 'format')
  u.searchParams.set('fit', 'max')
  return u.toString()
}
