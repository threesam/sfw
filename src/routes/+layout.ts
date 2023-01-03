import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  const data = await client.fetch(`*[_type == "project"]{
    ...,
    "src": mainImage.asset->url,
    "alt": mainImage.alt,
    "imagePalette": mainImage.asset->metadata.palette,
  }`)

  if (data) {
    return {
      data
    }
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  }
}