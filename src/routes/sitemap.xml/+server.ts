import type { RequestHandler } from './$types'
import { getAllProjects } from '$utils/sanity/client'
import { getProducts } from '$utils/printful'
import { canonical } from '$lib/utils/site'

export const prerender = true

const STATIC_ROUTES = ['/', '/projects', '/about', '/contact', '/merch'] as const

type Entry = { loc: string; priority?: number; lastmod?: string }

export const GET: RequestHandler = async () => {
	const [projects, products] = await Promise.all([
		getAllProjects().catch(() => []),
		getProducts().catch(() => []),
	])

	const entries: Entry[] = [
		...STATIC_ROUTES.map((r) => ({ loc: canonical(r), priority: r === '/' ? 1 : 0.8 })),
		...projects
			.filter((p) => p.slug)
			.map((p) => ({
				loc: canonical(`/projects/${p.slug}`),
				priority: 0.7,
				lastmod: p._updatedAt,
			})),
		...products.map((p) => ({ loc: canonical(`/merch/${p.id}`), priority: 0.6 })),
	]

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(({ loc, priority, lastmod }) => {
		const parts = [`<loc>${loc}</loc>`]
		if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`)
		if (priority != null) parts.push(`<priority>${priority}</priority>`)
		return `  <url>${parts.join('')}</url>`
	})
	.join('\n')}
</urlset>
`

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' },
	})
}
