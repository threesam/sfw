import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

export async function load({ params }) {
  const {slug} = params
  const data = await client.fetch(`*[_type == "project" && slug.current == "${slug}"][0]{
    ...,
    "src": mainImage.asset->url,
    "alt": mainImage.alt,
    "caption": mainImage.caption,
    "imagePalette": mainImage.asset->metadata.palette,
    "cast": cast[]{
      castname,
      "name": person->name
    },
    "crew": crew[]{
      "role": role->title,
      "name": person->name
    },
    "posters": posters[]{
      "src": asset->url,
      "alt": alt,
      "caption": caption,
    }
  }`)

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