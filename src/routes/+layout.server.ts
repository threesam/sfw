import { getSettings } from "$utils/sanity"

export async function load() {
  const settings = await getSettings({hostname: 'skeletonflowersandwater'})
  
  if (settings) {
    return {
      body: {
        settings
      }
    }
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  }
}