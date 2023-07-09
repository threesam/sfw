import { env } from '$env/dynamic/private'
import type { PrintfulSyncProduct, PrintfulSyncVariant } from '$types'

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
	const { result: allProducts } = await fetchPrintful('/store/products')

	return await Promise.all(
		(allProducts as PrintfulSyncProduct[]).map((product) => getProduct({ id: product.id }))
	)
}

export async function getProduct({ id }: { id: string | number }) {
	const { result } = await fetchPrintful(`/store/products/${id}`)
	const {
		sync_product,
		sync_variants
	}: {
		sync_product: PrintfulSyncProduct
		sync_variants: PrintfulSyncVariant[]
	} = result

	sync_variants?.forEach((v) => (v.product.thumbnail_url = sync_product.thumbnail_url))

	return {
		...sync_product,
		variants: sync_variants
	}
}

export function getId({
	product,
	variant
}: {
	product: PrintfulSyncProduct
	variant: PrintfulSyncVariant
}) {
	return `printful_${product.external_id}_${variant.external_id}`
}
