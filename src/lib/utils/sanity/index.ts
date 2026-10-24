import { SANITY_TOKEN } from '$app/env/private'
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$app/env/public'
import { createClient } from '@sanity/client'
import type { PrintfulProduct } from '$types'

const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  // Stays false deliberately: this client is token-authenticated and writes
  // (asset uploads from the Printful webhook). The CDN is read-only and does
  // not serve authenticated requests, so it cannot be used here. Low volume —
  // webhook-triggered, not per-visitor — so it is not what exhausts the quota.
  useCdn: false,
  token: SANITY_TOKEN
})

async function uploadImageFromUrl(url: string | null) {
  if (!url) return
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`)
  return await client.assets.upload('image', Buffer.from(await res.arrayBuffer()))
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
      _key: `printful_${product.external_id}_${variant.external_id}`,
      image: {
        asset: {
          _ref: image?._id
        }
      },
      name: product.name === variant.name ? 'One Size' : variant.name.split(' - ')[1],
      price: variant.retail_price,
      sku: variant.sku,
      thumbnailUrl: product.thumbnail_url
    }))
  })
}
