import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  const data = await client.fetch(`*[_type == "siteSettings" && hostname == 'skeletonflowersandwater'][0]{
    ...,
    "src": image.asset->url,
    "alt": image.alt
  }`)
  
  console.log('data', data);
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