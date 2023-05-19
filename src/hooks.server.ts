/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/contact')) {
		return await resolve(event)
	}

	return new Response('Redirect', { status: 303, headers: { Location: '/contact' } })
}
