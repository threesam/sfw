import { env } from '$env/dynamic/private'
import Stripe from 'stripe'
import { getProduct } from '$utils/printful.js'

type PrintfulWebhook = {
	type: 'product_updated' | 'product_deleted'
	created: number
	retries: number
	store: number
	data: {
		sync_product: {
			id: number
			external_id: string
			name: string
			variants?: number
			synced?: number
			thumbnail_url?: string
			is_ignored?: boolean
		}
	}
}

function getId({ product, variant }) {
	return `printful_${product.external_id}_${variant.external_id}`
}

export async function POST({ request }) {
	const webhookData: PrintfulWebhook = await request.json()

	// bail early if incorrect webhook type
	if (webhookData.type !== 'product_updated') {
		return new Response('Unsupported webhook')
	}
	// STRIPE UTILS
	// @ts-expect-error it is what it is
	const stripe = new Stripe(env.TEST_STRIPE_KEY)

	const product = await getProduct({
		id: webhookData.data.sync_product.id
	})

	const stripeProducts = await stripe.products.list()

	// loop through variants and upsert to stripe
	const variants = await Promise.all(
		product?.variants?.map((variant) => {
			// check if product already exists
			const productExists = stripeProducts.data.find((p) => p.id === getId({ product, variant }))

			// if it exists, update it
			if (productExists) {
				return stripe.products.update(getId({ product, variant }), {
					name: variant.name,
					images: product.thumbnail_url ? [product.thumbnail_url] : []
				})
			}

			// otherwise create a new one
			return stripe.products.create({
				id: getId({ product, variant }),
				name: variant.name,
				images: product.thumbnail_url ? [product.thumbnail_url] : [],
				default_price_data: {
					currency: variant.currency,
					unit_amount: +variant.retail_price * 100
				}
			})
		})
	)

	return new Response(JSON.stringify(variants, null, 2))
}
