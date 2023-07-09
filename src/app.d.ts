// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

export type castMember = {
	castname: string
	name: string
	link: string
}

export type crewMember = {
	role: string
	name: string
}

export type Image = {
	src: string
	alt: string
	captiom: string
}

export type PrintfulCustomer = {
	name: string | null
	company: string | null
	address1: string | null
	address2: string | null
	city: string | null
	state_code: string | null
	state_name: string | null
	country_code: string | null
	country_name: string | null
	zip: string | null
	phone: string | null
	email: string | null
	tax_number: string | null
}

export type PrintfulFile = {
	id: number
	type: string
	hash: string
	url: string | null
	filename: string
	mime_type: string
	size: number
	width: number
	height: number
	dpi: number | null
	status: string
	created: number
	thumbnail_url: string
	preview_url: string
	visible: boolean
	is_temporary: boolean
}

export type PrintfulShipmentInfo = {
	id: number
	carrier: string
	service: string
	tracking_number: number
	tracking_url: string
	created: number
	ship_date: string
	shipped_at: number
	reshipment: boolean
	items: {
		item_id: number
		quantity: number
		picked: number
		printed: number
	}[]
}

export type PrintfulOrderItem = {
	id: number
	external_id: string
	variant_id: number
	sync_variant_id: number
	external_variant_id: string
	warehouse_product_variant_id: number
	product_template_id: number
	external_product_id: string
	quantity: number
	price: string
	retail_price: string
	name: string
	product: PrintfulProduct
	files: [
		{
			type: string
			url: string
			options: [
				{
					id: string
					value: string
				}
			]
			filename: string
			visible: boolean
			position: {
				area_width: number
				area_height: number
				width: number
				height: number
				top: number
				left: number
				limit_to_print_area: boolean
			}
		}
	]
	options: [
		{
			id: string
			value: string
		}
	]
	sku: string | null
	discontinued: boolean
	out_of_stock: boolean
}

export type PrintfulProduct = {
	variant_id: number
	product_id: number
	thumbnail_url: string | null
	image: string
	name: string
}

export type PrintfulSyncProduct = {
	id: number
	external_id: string
	name: string
	variants: number
	synced: number
	thumbnail_url: string | null
	is_ignored: boolean
}

export type PrintfulSyncVariant = {
	id: number
	external_id: string
	sync_product_id: number
	name: string
	synced: boolean
	variant_id: number
	main_category_id: number
	warehouse_product_variant_id: string | null
	retail_price: string
	sku: string
	currency: string
	product: PrintfulProduct
	files: PrintfulFile[]
	options: {
		id: string
		value: string | string[] | boolean
	}[]
	is_ignored: false
}

export type PrintfulWebhook = {
	type: 'order_created' | 'package_shipped' | 'product_updated' | 'product_deleted'
	created: number
	retries: number
	store: number
	data: {
		order: {
			id: number | null
			external_id: string
			store: number | null
			status: string | null
			shipping: string
			shipping_service_name: string | null
			created: string | null
			updated: string | null
			recipient: PrintfulCustomer
			items: PrintfulOrderItem[]
			branding_items: null
			incomplete_items: null
			costs: null
			retail_costs: {
				currency: string
				subtotal: string
				discount: string
				shipping: string
				tax: string
			}
			pricing_breakdown: null
			shipments: null
			gift: {
				subject: string
				message: string
			}
			packing_slip: unknown
		}
		shipment: PrintfulShipmentInfo
		sync_product: {
			id: number
			external_id: string
			name: string
			variants: number | null
			synced: number | null
			thumbnail_url: string | null
			is_ignored: boolean | null
		}
	}
}

export type ProjectData = {
	title: string
	src: string
	alt: string
	caption: string
	image: Image
	body: []
	cast: castMember[]
	crew: crewMember[]
	posters: Image[]
}
