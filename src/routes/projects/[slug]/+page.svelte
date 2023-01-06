<script lang="ts">
	interface castMember {
		castname: string;
		name: string;
	}

	interface crewMember {
		role: string;
		name: string;
	}
	interface projectData {
		title: string;
		src: string;
		alt: string;
		body: [];
		cast: castMember[];
		crew: crewMember[];
	}
	export let data: projectData;
	console.log('data', data);

	import Banner from '$lib/components/Banner.svelte';
	import { PortableText } from '@portabletext/svelte';
</script>

<Banner title={data.title} src={data.src} alt={data.alt} path="/projects/" />

<section class="portable-text">
	<h3>synopsis</h3>
	<PortableText value={data.body} />

	{#if data.cast}
		<h4>cast</h4>
		<ul>
			{#each data.cast as castMember}
				<li>
					<span>{castMember.castname}</span>
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
					<span>{crewMember.role}</span>
					<span>{crewMember.name || 'anonymous'}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style lang="scss">
	section {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1rem;
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
			text-align: right;
		}

		span:nth-child(2) {
			text-align: left;
		}
	}
</style>
