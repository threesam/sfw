import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: "4yxngtwt",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
})

import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: string) {
  return builder.image(source)
}

export default urlFor