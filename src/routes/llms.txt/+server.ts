import type { RequestHandler } from './$types'
import { getAllProjects } from '$utils/sanity/client'
import { canonical } from '$lib/utils/site'

export const prerender = true

export const GET: RequestHandler = async () => {
	const projects = await getAllProjects().catch(() => [])

	const released = projects.filter((p) => ['completed', 'released'].includes(p.status ?? ''))
	const upcoming = projects.filter((p) =>
		['filming', 'post-production', 'pre-production'].includes(p.status ?? ''),
	)

	const renderFilm = (p: (typeof projects)[number]) =>
		`- [${p.title}](${canonical(`/projects/${p.slug}`)}): ${p.description?.trim() ?? ''}`

	const body = `# Skeleton Flowers and Water

> American film and television production company founded in 2020 by Laila Wolf and Lisa Ann Wolf. Stories where something is hidden underneath — neo-noir, dark comedy horror, period gothic, and romance drama.

The name comes from the perennial plant Diphylleia grayi, the Skeleton Flower, whose white petals turn transparent when touched by water.

## Films

${released.map(renderFilm).join('\n')}

## In Production

${upcoming.map(renderFilm).join('\n')}

## About

- [About](${canonical('/about')}): Founders, history, mission.
- [Contact](${canonical('/contact')}): Press, casting, distribution inquiries.

## Shop

- [Merch](${canonical('/merch')}): Apparel, posters, and limited goods.
`

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8' },
	})
}
