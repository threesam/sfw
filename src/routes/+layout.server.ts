import { getSettings } from '$utils/sanity/client'
import { error } from '@sveltejs/kit'

export async function load() {
  const settings = await getSettings({ hostname: 'skeletonflowersandwater' })

  if (settings) {
    // Top-level, not under `body`: every page also returns `body`, and SvelteKit
    // merges layout and page data shallowly, so a nested key here was silently
    // dropped on any page with its own load.
    return { settings }
  }

  throw error(404)
}
