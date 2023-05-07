import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function GET({ request }) {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: 'price_1Ka3JRENbNtMYgqEvxU4sKE5',
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `https://whocares.com/success.html`,
		cancel_url: `https://whocares.com/cancel.html`
	})

	return new Response(JSON.stringify({ session }, null, 2))
}
