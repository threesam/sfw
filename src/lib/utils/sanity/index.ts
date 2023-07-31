import { env as private_env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { createClient } from '@sanity/client'
import type { PrintfulProduct } from '$types'

const client = createClient({
  projectId: public_env.PUBLIC_SANITY_PROJECT_ID,
  dataset: public_env.PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: false,
  token: private_env.SANITY_TOKEN
})

export async function createOrReplacePrintfulProduct({ product }: { product: PrintfulProduct }) {
  return await client.createOrReplace({
    _id: product.external_id,
    _type: 'product',
    title: product.name,
    vendor: 'printful',
    variants: product.variants.map((variant) => ({
      _id: variant.external_id,
      name: variant.name,
      price: variant.retail_price,
      sku: variant.sku,
      thumbnailUrl: product.thumbnail_url
    }))
  })
}
