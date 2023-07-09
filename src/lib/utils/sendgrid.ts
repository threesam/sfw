import { env } from '$env/dynamic/private'
import { render } from 'svelte-email'
import OrderCreated from '$lib/emails/OrderCreated.svelte'
import PackageShipped from '$lib/emails/PackageShipped.svelte'
import sendgrid from '@sendgrid/mail'
import type { PrintfulCustomer, PrintfulShipmentInfo } from '../../app'

sendgrid.setApiKey(env.SENDGRID_API_KEY)

export type NotificationInput = {
	customer?: PrintfulCustomer
	orderNumber: string
	shipment?: PrintfulShipmentInfo
	rawData: unknown
}

export async function sendOrderCreatedNotification({
	rawData,
	customer,
	orderNumber
}: NotificationInput) {
	if (!customer?.email) {
		return await sendError({ orderNumber, rawData })
	}

	const emailHtml = render({
		template: OrderCreated,
		props: {
			customer,
			orderNumber
		}
	})

	let data
	try {
		data = await sendgrid.send({
			to: customer.email,
			from: env.SENDGRID_VERIFIED_SENDER,
			subject: `Skeleton Flowers and Water: Order ${orderNumber} Created`,
			html: emailHtml
		})
	} catch (e) {
		console.error(e)
		data = e
	}
	return data
}

export async function sendPackageShippedNotification({
	rawData,
	customer,
	orderNumber,
	shipment
}: NotificationInput) {
	// if there is a problem with an email send to default customer
	if (!customer?.email || !shipment) {
		return await sendError({ orderNumber, rawData })
	}

	const emailHtml = render({
		template: PackageShipped,
		props: {
			customer,
			orderNumber,
			shipment
		}
	})

	let data
	try {
		data = await sendgrid.send({
			to: customer.email,
			from: env.SENDGRID_VERIFIED_SENDER,
			subject: `Skeleton Flowers and Water: Order ${orderNumber} Shipped`,
			html: emailHtml
		})
	} catch (e) {
		console.error(e)
		data = e
	}
	return data
}

export async function sendError({ orderNumber, rawData }: NotificationInput) {
	return await sendgrid.send({
		to: env.SENDGRID_DEFAULT_RECIPIENT,
		from: env.SENDGRID_VERIFIED_SENDER,
		subject: `Error with Order ${orderNumber}`,
		text: 'and easy to do anywhere, even with Node.js',
		html: `<pre>${JSON.stringify(rawData)}</pre>`
	})
}
