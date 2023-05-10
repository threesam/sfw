import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function createCheckoutSession({ items = [], origin }) {
	const { data: stripeProducts } = await stripe.products.list()
	console.log('stripeProducts: ', stripeProducts)

	let lineItems = []
	stripeProducts.forEach((p) => {
		const lineItem = items.find((item) => 'printful_' + item.external_id === p.id)
		if (lineItem) {
			lineItems.push({
				quantity: lineItem.quantity,
				price: p.default_price
			})
		}
	})

	return stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: `${origin}/checkout/success`,
		cancel_url: `${origin}/`
	})
}
