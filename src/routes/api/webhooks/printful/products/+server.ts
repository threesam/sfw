import { env } from '$env/dynamic/private'
import Stripe from 'stripe'
import { getProduct } from '$utils/printful.js'
import { deleteProduct, upsertProduct } from '$utils/stripe.js'
import { json } from '@sveltejs/kit'
import { sendOrderCreatedNotification, sendPackageShippedNotification } from '$utils/sendgrid'

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
	const { data, type }: any = await request.json()

	if (type === 'order_created') {
		const res = await sendOrderCreatedNotification({
			customer: data.order.recipient,
			orderNumber: data.order.external_id,
			rawData: data
		})

		return json({
			res
		})
	}

	if (type === 'package_shipped') {
		const res = await sendPackageShippedNotification({
			customer: data.order.recipient,
			orderNumber: data.order.external_id,
			shipment: data.shipment,
			rawData: data
		})

		return json({
			res
		})
	}

	if (type === 'product_updated') {
		const product = await getProduct({
			id: data.sync_product.id
		})
		// loop through variants and upsert to stripe
		const variants = await upsertProduct({ product })

		return json({
			variants
		})
	}

	if (type === 'product_deleted') {
		const { message } = await deleteProduct({ id: data.sync_product.external_id })

		return json({
			message
		})
	}

	return new Response('Unsupported webhook')
}
