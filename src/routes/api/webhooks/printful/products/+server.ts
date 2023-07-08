import { env } from '$env/dynamic/private'
import Stripe from 'stripe'
import { getProduct } from '$utils/printful.js'
import { upsertProduct } from '$utils/stripe.js'
import { json } from '@sveltejs/kit'

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

	// @ts-expect-error init stripe
	const stripe = new Stripe(env.STRIPE_SECRET_KEY)

	const product = await getProduct({
		id: webhookData.data.sync_product.id
	})

	const stripeProducts = await stripe.products.list({ active: true, limit: 100 })

	if (webhookData.type === 'product_updated') {
		// loop through variants and upsert to stripe
		const variants = await upsertProduct({ product })

		return json({
			variants
		})
	}

	if (webhookData.type === 'product_deleted') {
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

	return new Response('Unsupported webhook')
}
