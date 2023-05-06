import { writable } from 'svelte/store'

export const cartQuantity = writable(null)
export const cartItems = writable([])
export const collectionHandles = writable([])
export const showCart = writable(false)
export const showMenu = writable(false)
export const search = writable('')
export const logoWidth = writable(0)

// export const getCartItems = async () => {
// 	const cartId = JSON.parse(localStorage.getItem('cartId'))

// 	try {
// 		const shopifyResponse = await loadCart({ cartId })

// 		let sum = 0
// 		const items = []
// 		shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((item) => {
// 			sum += item.node.quantity
// 			items.push(item)
// 		})
// 		cartQuantity.set(sum)
// 		cartItems.set(items)
// 		return shopifyResponse
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
