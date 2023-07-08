import { sendOrderCreatedNotification, sendPackageShippedNotification } from '$utils/sendgrid.js'

export async function POST({ request }) {
	const { data, type } = await request.json()
	// console.log('data: ', data)

	let res
	if (type === 'order_created') {
		res = await sendOrderCreatedNotification({
			customer: data.order.recipient,
			orderNumber: data.order.external_id,
			rawData: data
		})
	}

	if (type === 'package_shipped') {
		res = await sendPackageShippedNotification({
			customer: data.order.recipient,
			orderNumber: data.order.external_id,
			shipment: data.shipment,
			rawData: data
		})
	}

	return new Response(JSON.stringify({ res }, null, 2))
}
