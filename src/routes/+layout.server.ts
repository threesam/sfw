import { getSettings } from '$utils/sanity/client'
import { error } from '@sveltejs/kit'

export async function load() {
  const settings = await getSettings({ hostname: 'skeletonflowersandwater' })

  if (settings) {
    return {
      body: {
        settings
      }
    }
  }

  throw error(404)
}
