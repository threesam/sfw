import sanityClient from "@sanity/client"
import { siteSettings } from "$lib/groq/queries"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  const data = await client.fetch(siteSettings('skeletonflowersandwater'))
  
  if (data) {
    return {
      ...data
    }
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  }
}