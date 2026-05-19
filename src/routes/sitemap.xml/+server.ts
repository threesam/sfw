import type { RequestHandler } from './$types'
import { getAllProjects } from '$utils/sanity/client'
import { getProducts } from '$utils/printful'

export const prerender = true

const SITE = 'https://skeletonflowersandwater.com'

const staticRoutes = ['/', '/projects', '/about', '/contact']

export const GET: RequestHandler = async () => {
	const [projects, products] = await Promise.all([
		getAllProjects().catch(() => []),
		getProducts().catch(() => []),
	])

	const urls: { loc: string; priority?: number }[] = [
		...staticRoutes.map((r) => ({ loc: `${SITE}${r}`, priority: r === '/' ? 1 : 0.8 })),
		...projects
			.filter((p) => p.slug)
			.map((p) => ({ loc: `${SITE}/projects/${p.slug}`, priority: 0.7 })),
		...products.map((p) => ({ loc: `${SITE}/merch/${p.id}`, priority: 0.6 })),
	]

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ loc, priority }) =>
			`  <url><loc>${loc}</loc>${priority != null ? `<priority>${priority}</priority>` : ''}</url>`,
	)
	.join('\n')}
</urlset>
`

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' },
	})
}
