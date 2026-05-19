import { writable } from 'svelte/store'
import type { PrintfulSyncVariant } from '$types'

export type CartItem = PrintfulSyncVariant & { quantity: number }

export const cartQuantity = writable(0)
export const cartItems = writable<CartItem[]>([])
export const showCart = writable(false)
export const showMenu = writable(false)
export const search = writable('')
