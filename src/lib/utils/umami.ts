import type { PrintfulSyncVariant } from '$types'

export function trackCart({
  variant,
  type
}: {
  variant: PrintfulSyncVariant
  type: 'add-to-cart' | 'remove-from-cart'
}) {
  if (window?.umami) {
    window.umami.track(type, {
      // category: product?.productType ?? '',
      // id: getId(product?.id) ?? '',
      // imageURL: product?.images.edges[0].node.originalSrc ?? '',
      name: variant?.name ?? '',
      price: Number(variant.retail_price) ?? '',
      // sku: variant.sku ?? '',
      // variant: variant.node.title ?? '',
      variant_id: variant.id ?? ''
    })
  }
}
