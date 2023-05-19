import client from '@mailchimp/mailchimp_marketing'
import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'

// configure mailchimp client
client.setConfig({
	apiKey: env.MAILCHIMP_API_KEY,
	server: env.MAILCHIMP_SERVER_PREFIX
})

export async function GET({ url }) {
	const { searchParams } = new URL(url)

	if (searchParams.get('i_will_allow_it')) {
		const response = await client.lists.getListMembersInfo(env.MAILCHIMP_LIST_ID)

		return new Response(JSON.stringify(response, null, 2))
	}
}

export async function POST({ request }) {
	const { email } = await request.json()

	// check if member already exists, if so do nothing
	try {
		const response = await client.lists.setListMember(env.MAILCHIMP_LIST_ID, email, {
			status: 'subscribed'
		})

		return new Response(JSON.stringify({ email, response }, null, 2))
	} catch ({ status }: any) {
		console.error(status)
	}
}
