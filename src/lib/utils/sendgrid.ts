import type { PrintfulOrder, PrintfulShipmentInfo, PrintfulWebhook } from '$types'
import { env } from '$env/dynamic/private'
import { render } from 'svelte-email'
import OrderCreated from '$lib/emails/OrderCreated.svelte'
import PackageShipped from '$lib/emails/PackageShipped.svelte'
import sendgrid from '@sendgrid/mail'
import { error } from '@sveltejs/kit'

sendgrid.setApiKey(env.SENDGRID_API_KEY)

export async function sendOrderCreatedNotification({ order }: { order: PrintfulOrder }) {
	if (!order.recipient?.email) {
		throw error(500, 'No order id provided')
	}

	const emailHtml = render({
		template: OrderCreated,
		props: { order }
	})

	return await sendgrid.send({
		to: order.recipient.email,
		from: env.SENDGRID_VERIFIED_SENDER,
		subject: `Skeleton Flowers and Water: Order Created`,
		html: emailHtml
	})
}

export async function sendPackageShippedNotification({
	order,
	shipment
}: {
	order: PrintfulOrder
	shipment: PrintfulShipmentInfo
}) {
	if (!order.id) {
		throw error(500, 'No order id provided')
	}

	if (!order.recipient.email) {
		throw error(500, 'No email provided')
	}

	if (!shipment) {
		throw error(500, 'No shipment details provided')
	}

	const emailHtml = render({
		template: PackageShipped,
		props: {
			order,
			shipment
		}
	})

	return await sendgrid.send({
		to: order.recipient.email,
		from: env.SENDGRID_VERIFIED_SENDER,
		subject: `Skeleton Flowers and Water: Order ${order.id} Shipped`,
		html: emailHtml
	})
}
