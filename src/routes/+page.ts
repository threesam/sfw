import sanityClient from "@sanity/client"
import {allProjects} from '$lib/groq/queries'

export const prerender = true

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  const projects = await client.fetch(allProjects)

  if (projects) {
    return {
      projects
    }
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  }
}