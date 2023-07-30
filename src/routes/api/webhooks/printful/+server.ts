import { deleteProduct, upsertProduct } from '$utils/stripe.js'
import { sendOrderCreatedNotification, sendPackageShippedNotification } from '$utils/sendgrid'
import { getProduct } from '$utils/printful.js'
import { json } from '@sveltejs/kit'
import type { PrintfulWebhook } from '$types'
import { createOrReplacePrintfulroduct } from '$utils/transactions'

export async function POST({ request }) {
	const { data, type }: PrintfulWebhook = await request.json()

	if (type === 'order_created') {
		const res = await sendOrderCreatedNotification({
			order: data.order
		})

		return json({
			res
		})
	}

	if (type === 'package_shipped') {
		const res = await sendPackageShippedNotification({
			order: data.order,
			shipment: data.shipment
		})

		return json({
			res
		})
	}

	if (type === 'product_updated') {
		const product = await getProduct({
			id: data.sync_product.id
		})

		const res = {
			sanity: undefined,
			stripe: undefined
		}

		try {
			res.sanity = await createOrReplacePrintfulroduct({ product })
		} catch (error) {
			console.error('error: ', error)
			res.sanity = error
		}

		try {
			res.stripe = await upsertProduct({ product })
		} catch (error) {
			console.error('error: ', error)
			res.stripe = error
		}

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
