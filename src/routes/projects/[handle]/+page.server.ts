import { getProject } from '$utils/sanity.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
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
