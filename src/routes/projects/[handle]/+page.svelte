<script lang="ts">
	import type {PageData} from './$types'
	import Banner from '$lib/components/Banner.svelte';
	import Swiper from '$lib/components/Swiper.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data: PageData;

	const { project } = data.body
</script>

<Banner height="40vh" image={project.image} />
<section class="px-5">
	<h1 class="text-3xl lg:text-5xl pb-10">{project.title}</h1>

	<div class="mx-auto w-max pb-10">
		<SocialLinks size={40} links={project.links} color={project.image.color} />
	</div>

	<div style={`--primary: ${project.image.color}`}>
		{#if project.body}
			<h3 class="font-sans font-normal text-2xl">abstract</h3>
			<div class="portable-text font-extralight text-center mb-5">
				<PortableText value={project.body} />
			</div>
		{/if}

		{#if project.cast}
			<h4 class="text-2xl font-sans pt-3">cast</h4>
			<ul class="mb-5">
				{#each project.cast as castMember}
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

		{#if project.crew}
			<h4 class="text-2xl pt-3 font-sans">crew</h4>
			<ul>
				{#each project.crew as crewMember}
					<li>
						<span class="shimmer">{crewMember.role}</span>
						<span>{crewMember.name || 'anonymous'}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	{#if project.posters}
		<Swiper slides={project.posters} />
	{/if}
</section>

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
	}
</style>
