// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	export type castMember = {
		castname: string;
		name: string;
		link: string;
	}

	export type crewMember = {
		role: string;
		name: string;
	}

	export type Image = {
		src: string;
		alt: string;
		captiom: string;
	}
	export type projectData = {
		title: string;
		src: string;
		alt: string;
		caption: string;
		image: Image;
		body: [];
		cast: castMember[];
		crew: crewMember[];
		posters: Image[];
	}
}
