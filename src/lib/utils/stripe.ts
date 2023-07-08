import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '$env/static/private'
import { getId } from './printful'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
})

export async function getAllProducts() {
	return await stripe.products.list({ active: true, limit: 100 })
}

export async function createCheckoutSession({ items = [], origin }) {
	const { data: stripeProducts } = await stripe.products.list()
	console.log('stripeProducts: ', stripeProducts)

	let lineItems = []
	stripeProducts.forEach((p) => {
		const lineItem = items.find((item) => p.id.split('_')[2] === item.external_id)
		if (lineItem) {
			lineItems.push({
				quantity: lineItem.quantity,
				adjustable_quantity: { enabled: true },
				price: p.default_price
			})
		}
	})

	return stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: `${origin}/checkout/success`,
		cancel_url: `${origin}/`,
		shipping_address_collection: {
			allowed_countries: ['US']
		}
	})
}

export async function upsertProduct({ product }) {
	const { data: allProducts } = await getAllProducts()
	// loop through variants and upsert to stripe
	const variants = await Promise.all(
		product?.variants?.map((variant) => {
			// check if product already exists
			const productExists = allProducts.find((p) => p.id === getId({ product, variant }))

			// if it exists, update it
			if (productExists) {
				return stripe.products.update(getId({ product, variant }), {
					name: variant.name,
					images: product.thumbnail_url ? [product.thumbnail_url] : []
				})
			}

			// otherwise create a new one
			return stripe.products.create({
				active: false,
				id: getId({ product, variant }),
				name: variant.name,
				images: product.thumbnail_url ? [product.thumbnail_url] : [],
				default_price_data: {
					currency: variant.currency,
					unit_amount: +variant.retail_price * 100
				}
			})
		})
	)

	return variants
}

export async function deleteProduct({ id }) {
	// parent product id
	const { data: allProducts } = await getAllProducts()

	// return products that include parent product id
	const productsToDelete = allProducts.filter((p) => p.id.split('_')[1] === id)

	// loop through products, set to inactive
	for (const p of productsToDelete) {
		await stripe.products.update(p.id, { active: false })
	}

	return {
		message: 'Product(s) set to inactive'
	}
}
