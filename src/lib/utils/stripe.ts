import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '$env/static/private'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
})

export async function createCheckoutSession({ items = [], origin = '', pathname = '/' }) {
	console.log('items: ', items)
	const { data: stripeProducts } = await stripe.products.list()
	console.log('stripeProducts: ', stripeProducts)

	const lineItems = [] as Stripe.Checkout.SessionCreateParams.LineItem[]

	stripeProducts.forEach((p) => {
		const item = items.find((item) => p.id.split('_')[2] === item.external_id)

		if (item) {
			lineItems.push({
				quantity: item.quantity,
				adjustable_quantity: { enabled: true },
				price: p.default_price as string | undefined
			})
		}
	})

	return stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: `${origin}/checkout/success`,
		cancel_url: origin + pathname,
		shipping_address_collection: {
			allowed_countries: ['US']
		}
	})
}
