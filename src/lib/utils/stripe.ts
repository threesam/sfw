import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '$env/static/private'

const stripe = new Stripe(STRIPE_SECRET_KEY)

export async function createCheckoutSession({ items = [], origin }) {
	const { data: stripeProducts } = await stripe.products.list()
	console.log('stripeProducts: ', stripeProducts)

	let lineItems = []
	stripeProducts.forEach((p) => {
		const lineItem = items.find((item) => p.id.split('_')[2] === item.external_id)
		if (lineItem) {
			lineItems.push({
				quantity: lineItem.quantity,
				adjustable_quantity: { enabled: true },
				price: p.default_price
			})
		}
	})

	return stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: `${origin}/checkout/success`,
		cancel_url: `${origin}/`,
		shipping_address_collection: {
			allowed_countries: ['US']
		}
	})
}
