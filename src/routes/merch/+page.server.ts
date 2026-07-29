import { error } from '@sveltejs/kit'
import { getProducts } from '$utils/printful'

export async function load() {
	const products = await getProducts()

	if (products) {
		return {
			body: {
				products,
			},
		}
	}

	throw error(404)
}
