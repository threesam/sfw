import { error } from '@sveltejs/kit'
import { getProject } from '$utils/sanity/client.js'
import type { RouteParams } from './$types'

export async function load({ params }: { params: RouteParams }) {
	const { handle } = params
	const project = await getProject({ handle })

	if (project) {
		return {
			body: {
				project
			}
		}
	}

	throw error(404)
}
