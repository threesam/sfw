import { getProductImageMap } from './sanity/client'
import type { PrintfulProduct } from '$types'

/** A Printful product with the Sanity-hosted copy of its image attached. */
export type ProductWithImage = PrintfulProduct & { sanityImageUrl?: string }

/**
 * Attach the Sanity-hosted image to each Printful product, keyed on external_id
 * (which is what createOrReplacePrintfulProduct uses as the Sanity _id).
 *
 * Kept as a separate field rather than overwriting thumbnail_url, so the origin
 * of each URL stays honest and callers can fall back when Sanity has no copy -
 * a brand new product is in Printful before the webhook has uploaded anything.
 */
export async function attachSanityImages(products: PrintfulProduct[]): Promise<ProductWithImage[]> {
  let images: Record<string, string> = {}
  try {
    images = await getProductImageMap()
  } catch {
    // Sanity being unreachable must not take the shop down; fall back to the
    // Printful thumbnails, which is exactly what shipped before this change.
    return products
  }
  return products.map((p) => {
    const url = images[p.external_id]
    return url ? { ...p, sanityImageUrl: url } : p
  })
}
