import { createCheckoutSession } from '$utils/stripe'
import { error } from '@sveltejs/kit'

export async function POST({ request }: { request: Request }) {
  const { items, pathname } = await request.json()
  const { origin } = new URL(request.url)

  // pathname becomes Stripe's cancel_url as origin + pathname. Unchecked, a value
  // like "@evil.example" turns that into https://site@evil.example - a cancel
  // button that leaves for another host. Only a same-origin path is accepted.
  const safePath = typeof pathname === 'string' && /^\/(?![/\\])/.test(pathname) ? pathname : '/'

  try {
    const session = await createCheckoutSession({ origin, items, pathname: safePath })

    return new Response(session.url)
  } catch (e) {
    throw error(500, e as Error)
  }
}
