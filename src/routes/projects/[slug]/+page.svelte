<script lang="ts">
	interface castMember {
		castname: string;
		name: string;
		link: string;
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
		image: Image;
		body: [];
		cast: castMember[];
		crew: crewMember[];
		posters: Image[];
	}
	export let data: projectData;

	import Banner from '$lib/components/Banner.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { PortableText } from '@portabletext/svelte';
</script>

<Banner height="40vh" image={data.image} />
<h1>{data.title}</h1>

<section>
	<SocialLinks size="50" color={data.image.color} />
</section>

<section class="portable-text" style={`--primary: ${data.image.color}`}>
	<h3>synopsis</h3>
	<PortableText value={data.body} />

	{#if data.cast}
		<h4>cast</h4>
		<ul>
			{#each data.cast as castMember}
				<li>
					<span class="shimmer">{castMember.castname}</span>
					{#if castMember.name && castMember.link}
						<a href={castMember.link}>{castMember.name}</a>
					{:else}
						<span>{castMember.name}</span>
					{/if}
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

		a {
			width: max-content;
			border-bottom: 1px solid var(--primary);
		}

		span,
		a {
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
