<script lang="ts">
	interface castMember {
		castname: string;
		name: string;
	}

	interface crewMember {
		role: string;
		name: string;
	}

	interface Image {
		src: string;
		alt: string;
		captiom: string;
	}
	interface projectData {
		title: string;
		src: string;
		alt: string;
		caption: string;
		body: [];
		cast: castMember[];
		crew: crewMember[];
		posters: Image[];
	}
	export let data: projectData;
	console.log('data', data);

	import Banner from '$lib/components/Banner.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import { PortableText } from '@portabletext/svelte';
</script>

<Banner height="30vh" src={data.src} alt={data.alt} />
<h1>{data.title}</h1>

<section class="portable-text">
	<h3>synopsis</h3>
	<PortableText value={data.body} />

	{#if data.cast}
		<h4>cast</h4>
		<ul>
			{#each data.cast as castMember}
				<li>
					<span class="shimmer">{castMember.castname}</span>
					<span>{castMember.name}</span>
				</li>
			{/each}
		</ul>
	{/if}

	{#if data.crew}
		<h4>crew</h4>
		<ul>
			{#each data.crew as crewMember}
				<li>
					<span class="shimmer">{crewMember.role}</span>
					<span>{crewMember.name || 'anonymous'}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>

{#if data.posters}
	<Carousel slides={data.posters} />
{/if}

<style lang="scss">
	section {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1rem;
	}
	h1 {
		text-align: center;
		max-width: 60rem;
		margin: 1rem auto 0 auto;
	}

	h3,
	h4 {
		width: 100%;
		text-align: center;
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		width: 100%;

		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		span {
			text-transform: lowercase;
		}

		.shimmer {
			text-shadow: 1px 1px 1px var(--primary);
		}

		span:nth-child(1) {
			text-align: right;
			font-weight: 900;
		}

		span:nth-child(2) {
			text-align: left;
		}
	}
</style>
