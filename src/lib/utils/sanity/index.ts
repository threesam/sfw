import { env as private_env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { createClient } from '@sanity/client'
import type { PrintfulProduct } from '$types'
import axios from 'axios'

const client = createClient({
  projectId: public_env.PUBLIC_SANITY_PROJECT_ID,
  dataset: public_env.PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: false,
  token: private_env.SANITY_TOKEN
})

async function uploadImageFromUrl(url: string | null) {
  if (!url) return

  const { data } = await axios.get(url, { responseType: 'arraybuffer' })

  return await client.assets.upload('image', Buffer.from(data, 'binary'))
}

export async function createOrReplacePrintfulProduct({ product }: { product: PrintfulProduct }) {
  const image = await uploadImageFromUrl(product.thumbnail_url)

  return await client.createOrReplace({
    _id: product.external_id,
    _type: 'product',
    title: product.name,
    vendor: 'printful',
    variants: product.variants.map((variant) => ({
      _id: variant.external_id,
      image: {
        ref: image?._id
      },
      name: variant.name,
      price: variant.retail_price,
      sku: variant.sku,
      thumbnailUrl: product.thumbnail_url
    }))
  })
}
