import { env } from '$env/dynamic/private'
import Stripe from 'stripe'

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

export async function POST({ request }) {
	const webhookData: PrintfulWebhook = await request.json()

	// bail early if incorrect webhook type
	if (webhookData.type !== 'product_deleted') {
		return new Response('Unsupported webhook')
	}

	// @ts-expect-error it is what it is
	const stripe = new Stripe(env.TEST_STRIPE_KEY)
	const stripeProducts = await stripe.products.list()

	// parent product id
	const productId = webhookData.data.sync_product.external_id

	// return products that include parent product id
	const productsToDelete = stripeProducts.data.filter((p) => p.id.split('_')[1] === productId)

	// loop through products, set to inactive
	for (const p of productsToDelete) {
		await stripe.products.update(p.id, { active: false })
	}

	return new Response('Product(s) set to inactive')
}
