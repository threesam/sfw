import { env } from '$env/dynamic/private'

export async function fetchPrintful(endpoint: string) {
	const res = await fetch(env.PRINTFUL_API_ENDPOINT + endpoint, {
		headers: {
			Authorization: 'Bearer ' + env.PRINTFUL_PRIVATE_ACCESS_KEY ?? '',
			'X-PF-Store-Id': env.PRINTFUL_STORE_ID ?? ''
		}
	})

	return await res.json()
}

export async function getProducts() {
	const products = await fetchPrintful('/store/products')

	return await Promise.all(products.result.map((product: any) => getProduct({ id: product.id })))
}

export async function getProduct({ id }: { id: string | number }) {
	const { result } = await fetchPrintful(`/store/products/${id}`)
	const { sync_product, sync_variants } = result

	sync_variants?.forEach((v: any) => (v.product.thumbnail_url = sync_product.thumbnail_url))

	return {
		...sync_product,
		variants: sync_variants
	}
}

export function getId({ product, variant }) {
	return `printful_${product.external_id}_${variant.external_id}`
}

// MODELS

export const orderCreatedModel = {
	type: 'order_created',
	created: 1622456737,
	retries: 2,
	store: 12,
	data: {
		order: {
			id: null,
			external_id: '4235234213',
			store: null,
			status: null,
			shipping: 'STANDARD',
			shipping_service_name: null,
			created: null,
			updated: null,
			recipient: {
				name: 'John Smith',
				company: 'John Smith Inc',
				address1: '19749 Dearborn St',
				address2: 'string',
				city: 'Chatsworth',
				state_code: 'CA',
				state_name: 'California',
				country_code: 'US',
				country_name: 'United States',
				zip: '91311',
				phone: 'string',
				email: 'string',
				tax_number: '123.456.789-10'
			},
			items: [
				{
					id: 1,
					external_id: 'item-1',
					variant_id: 1,
					sync_variant_id: 1,
					external_variant_id: 'variant-1',
					warehouse_product_variant_id: 1,
					product_template_id: 1,
					external_product_id: 'template-123',
					quantity: 1,
					price: '13.00',
					retail_price: '13.00',
					name: 'Enhanced Matte Paper Poster 18×24',
					product: {
						variant_id: 3001,
						product_id: 301,
						image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
						name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)'
					},
					files: [
						{
							type: 'default',
							url: 'https://www.example.com/files/tshirts/example.png',
							options: [
								{
									id: 'template_type',
									value: 'native'
								}
							],
							filename: 'shirt1.png',
							visible: true,
							position: {
								area_width: 1800,
								area_height: 2400,
								width: 1800,
								height: 1800,
								top: 300,
								left: 0,
								limit_to_print_area: true
							}
						}
					],
					options: [
						{
							id: 'OptionKey',
							value: 'OptionValue'
						}
					],
					sku: null,
					discontinued: true,
					out_of_stock: true
				}
			],
			branding_items: null,
			incomplete_items: null,
			costs: null,
			retail_costs: {
				currency: 'USD',
				subtotal: '10.00',
				discount: '0.00',
				shipping: '5.00',
				tax: '0.00'
			},
			pricing_breakdown: null,
			shipments: null,
			gift: {
				subject: 'To John',
				message: 'Have a nice day'
			},
			packing_slip: {}
		}
	}
}

export const packageShipped = {
	type: 'package_shipped',
	created: 1622456737,
	retries: 2,
	store: 12,
	data: {
		shipment: {
			id: 10,
			carrier: 'FEDEX',
			service: 'FedEx SmartPost',
			tracking_number: 0,
			tracking_url: 'https://www.fedex.com/fedextrack/?tracknumbers=0000000000',
			created: 1588716060,
			ship_date: '2020-05-05',
			shipped_at: 1588716060,
			reshipment: false,
			items: [
				{
					item_id: 1,
					quantity: 1,
					picked: 1,
					printed: 1
				}
			]
		},
		order: {
			id: null,
			external_id: '4235234213',
			store: null,
			status: null,
			shipping: 'STANDARD',
			shipping_service_name: null,
			created: null,
			updated: null,
			recipient: {
				name: 'John Smith',
				company: 'John Smith Inc',
				address1: '19749 Dearborn St',
				address2: 'string',
				city: 'Chatsworth',
				state_code: 'CA',
				state_name: 'California',
				country_code: 'US',
				country_name: 'United States',
				zip: '91311',
				phone: 'string',
				email: 'string',
				tax_number: '123.456.789-10'
			},
			items: [
				{
					id: 1,
					external_id: 'item-1',
					variant_id: 1,
					sync_variant_id: 1,
					external_variant_id: 'variant-1',
					warehouse_product_variant_id: 1,
					product_template_id: 1,
					external_product_id: 'template-123',
					quantity: 1,
					price: '13.00',
					retail_price: '13.00',
					name: 'Enhanced Matte Paper Poster 18×24',
					product: {
						variant_id: 3001,
						product_id: 301,
						image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
						name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)'
					},
					files: [
						{
							type: 'default',
							url: 'https://www.example.com/files/tshirts/example.png',
							options: [
								{
									id: 'template_type',
									value: 'native'
								}
							],
							filename: 'shirt1.png',
							visible: true,
							position: {
								area_width: 1800,
								area_height: 2400,
								width: 1800,
								height: 1800,
								top: 300,
								left: 0,
								limit_to_print_area: true
							}
						}
					],
					options: [
						{
							id: 'OptionKey',
							value: 'OptionValue'
						}
					],
					sku: null,
					discontinued: true,
					out_of_stock: true
				}
			],
			branding_items: null,
			incomplete_items: null,
			costs: null,
			retail_costs: {
				currency: 'USD',
				subtotal: '10.00',
				discount: '0.00',
				shipping: '5.00',
				tax: '0.00'
			},
			pricing_breakdown: null,
			shipments: null,
			gift: {
				subject: 'To John',
				message: 'Have a nice day'
			},
			packing_slip: {}
		}
	}
}
