import type { RequestHandler } from './$types'
import { getAllProjects } from '$utils/sanity/client'

export const prerender = true

const SITE = 'https://skeletonflowersandwater.com'

export const GET: RequestHandler = async () => {
	const projects = await getAllProjects().catch(() => [])

	const released = projects.filter((p) => ['completed', 'released'].includes(p.status ?? ''))
	const upcoming = projects.filter((p) =>
		['filming', 'post-production', 'pre-production'].includes(p.status ?? ''),
	)

	const body = `# Skeleton Flowers and Water

> American film and television production company founded in 2020 by Laila Wolf and Lisa Ann Wolf. Stories where something is hidden underneath — neo-noir, dark comedy horror, period gothic, and romance drama.

The name comes from the perennial plant Diphylleia grayi, the Skeleton Flower, whose white petals turn transparent when touched by water.

## Films

${released
	.map(
		(p) => `- [${p.title}](${SITE}/projects/${p.slug}): ${p.description?.trim() ?? ''}`,
	)
	.join('\n')}

## In Production

${upcoming
	.map(
		(p) => `- [${p.title}](${SITE}/projects/${p.slug}): ${p.description?.trim() ?? ''}`,
	)
	.join('\n')}

## About

- [About](${SITE}/about): Founders, history, mission.
- [Contact](${SITE}/contact): Press, casting, distribution inquiries.

## Shop

- [Merch](${SITE}/merch): Apparel, posters, and limited goods.
`

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8' },
	})
}
