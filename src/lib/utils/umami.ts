import type { PrintfulSyncVariant } from '$types'

// Shared guard so every call site (cart, subscribe, checkout, ...) gets the same
// "never let analytics break the UI it's attached to" protection in one place.
export function track(event: string, data?: Record<string, string | number | boolean>) {
  try {
    if (window?.umami) window.umami.track(event, data)
  } catch {
    // ponytail: swallow — a tracking failure must never surface as a user-facing error
  }
}

export function trackCart({
  variant,
  type
}: {
  variant: PrintfulSyncVariant
  type: 'add-to-cart' | 'remove-from-cart'
}) {
  track(type, {
    name: variant?.name ?? '',
    price: Number(variant.retail_price) ?? '',
    variant_id: variant.id ?? ''
  })
}
