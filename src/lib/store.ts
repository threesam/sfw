import { derived, writable } from 'svelte/store'
import type { PrintfulSyncVariant } from '$types'

export type CartItem = PrintfulSyncVariant & { quantity: number }

export const cartItems = writable<CartItem[]>([])
// Derived, not a separate writable: nothing ever wrote the old writable, so the
// header badge sat at 0 no matter what was in the cart.
export const cartQuantity = derived(cartItems, (items) =>
  items.reduce((acc, item) => acc + item.quantity, 0)
)
export const showCart = writable(false)
export const showMenu = writable(false)
