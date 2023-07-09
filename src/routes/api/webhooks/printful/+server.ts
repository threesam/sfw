import { deleteProduct, upsertProduct } from '$utils/stripe.js'
import { sendOrderCreatedNotification, sendPackageShippedNotification } from '$utils/sendgrid'
import { getProduct } from '$utils/printful.js'
import { json } from '@sveltejs/kit'
import type { PrintfulWebhook } from '$types'

export async function POST({ request }) {
	const { data, type }: PrintfulWebhook = await request.json()

	if (type === 'order_created') {
		const res = await sendOrderCreatedNotification({
			customer: data.order.recipient,
			orderNumber: String(data.order.id),
			rawData: data
		})

		return json({
			res
		})
	}

	if (type === 'package_shipped') {
		const res = await sendPackageShippedNotification({
			customer: data.order.recipient,
			orderNumber: String(data.order.id),
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
		const res = await upsertProduct({ product })

		return json({
			res
		})
	}

	if (type === 'product_deleted') {
		const res = await deleteProduct({ id: data.sync_product.external_id })

		return json({
			res
		})
	}

	return new Response('Unsupported webhook')
}
