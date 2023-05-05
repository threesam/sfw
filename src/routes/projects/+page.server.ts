import { getAllProjects } from '$utils/sanity'
import { error } from '@sveltejs/kit'

export async function load() {
	const projects = await getAllProjects()

	if (projects) {
		return {
			body: {
				projects
			}
		}
	}

	throw error(404)
}
