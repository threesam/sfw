import { getProducts } from '$utils/printful'
import { getAllProjects } from '$utils/sanity'
import { error } from '@sveltejs/kit'

export async function load() {
	const projects = await getAllProjects()
	const products = await getProducts()

	if (projects && products) {
		return {
			body: {
				projects,
				products
			}
		}
	}

	throw error(404)
}
