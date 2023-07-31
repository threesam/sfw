import { createCheckoutSession } from '$utils/stripe'
import { error } from '@sveltejs/kit'

export async function POST({ request }: { request: Request }) {
  const { items, pathname } = await request.json()
  const { origin } = new URL(request.url)

  try {
    const session = await createCheckoutSession({ origin, items, pathname })

    return new Response(session.url)
  } catch (e) {
    throw error(500, e as Error)
  }
}
