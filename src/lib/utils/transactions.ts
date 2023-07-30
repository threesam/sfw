import { env } from '$env/dynamic/private'
import { createClient } from '@sanity/client'
import type { PrintfulProduct } from '$types'

const client = createClient({
	projectId: env.SANITY_PROJECT_ID,
	dataset: env.SANITY_DATASET,
	apiVersion: '2021-10-21',
	useCdn: false,
	token: env.SANITY_TOKEN
})

export async function createOrReplacePrintfulroduct({ product }: { product: PrintfulProduct }) {
	return await client.createOrReplace({
		_id: product.external_id,
		_type: 'product',
		title: product.name,
		vendor: 'printful',
		variants: product.variants.map((variant) => ({
			_id: variant.external_id,
			name: variant.name,
			price: variant.retail_price,
			sku: variant.sku,
			thumbnailUrl: product.thumbnail_url
		}))
	})
}
