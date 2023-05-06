import { writable } from 'svelte/store'

export const cartQuantity = writable(0)
export const cartItems = writable([])
export const showCart = writable(false)
export const showMenu = writable(false)
export const search = writable('')
