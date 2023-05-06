import { getProduct } from '$utils/printful'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const { id } = params
	const product = await getProduct({ id })

	if (product) {
		return {
			body: {
				product
			}
		}
	}

	throw error(404)
}
