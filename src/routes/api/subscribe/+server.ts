import client from '@mailchimp/mailchimp_marketing'
import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'

// configure mailchimp client
client.setConfig({
  apiKey: env.MAILCHIMP_API_KEY,
  server: env.MAILCHIMP_SERVER_PREFIX
})

export async function POST({ request }: { request: Request }) {
  const { email } = await request.json()

  // create member
  try {
    const event = await client.lists.setListMember(env.MAILCHIMP_LIST_ID, email, {
      email_address: email,
      status_if_new: 'pending'
    })

    console.log({ email, event })
    return new Response(JSON.stringify({ email, event }, null, 2))
  } catch (e) {
    console.error(e)
    throw error(500, e as Error)
  }
}
