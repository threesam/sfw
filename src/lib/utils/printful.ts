import { env } from '$env/dynamic/private'

export async function fetchPrintful(endpoint: string) {
	const res = await fetch(env.PRINTFUL_API_ENDPOINT + endpoint, {
		headers: {
			Authorization: 'Bearer ' + env.PRINTFUL_PRIVATE_ACCESS_KEY ?? '',
			'X-PF-Store-Id': env.PRINTFUL_STORE_ID ?? ''
		}
	})

	return await res.json()
}

export async function getProducts() {
	const products = await fetchPrintful('/store/products')

	return await Promise.all(products.result.map((product: any) => getProduct({ id: product.id })))
}

export async function getProduct({ id }: { id: string | number }) {
	const { result } = await fetchPrintful(`/store/products/${id}`)
	const { sync_product, sync_variants } = result

	sync_variants?.forEach((v: any) => (v.product.thumbnail_url = sync_product.thumbnail_url))

	return {
		...sync_product,
		variants: sync_variants
	}
}
