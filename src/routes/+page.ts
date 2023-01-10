import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  const projects = await client.fetch(`*[_type == "project"]{
    title,
    description,
    "slug": slug.current,
    "src": mainImage.asset->url,
    "alt": mainImage.alt,
    "imagePalette": mainImage.asset->metadata.palette,
  }`)

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