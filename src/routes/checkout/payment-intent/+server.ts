import { createCheckoutSession } from '$utils/stripe'

export async function POST({ request }) {
	const items = await request.json()
	const { origin } = new URL(request.url)

	try {
		const session = await createCheckoutSession({ origin, items })

		return new Response(session.url)
	} catch (error) {
		return new Response(error.message, {
			status: error.status
		})
	}
}
