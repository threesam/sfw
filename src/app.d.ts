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
	name?: string
	company?: string
	address1?: string
	address2?: string
	city?: string
	state_code?: string
	state_name?: string
	country_code?: string
	country_name?: string
	zip?: string
	phone?: string
	email?: string
	tax_number?: string
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
