import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  console.log('params', params);
  const {slug} = params
  console.log('slug', slug);
  const data = await client.fetch(`*[_type == "project" && slug.current == "${slug}"][0]{
    ...,
    "src": mainImage.asset->url,
    "alt": mainImage.alt
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