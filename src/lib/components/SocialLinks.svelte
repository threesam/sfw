<script lang="ts">
	interface Link {
		title: string;
		href: string;
	}

	import { scale } from 'svelte/transition';

	export let color = 'var(--background)';
	export let size = 69;
	export let links: Link[] = [];

	import Facebook from './icons/Facebook.svelte';
	import Imdb from './icons/Imdb.svelte';
	import Instagram from './icons/Instagram.svelte';
	import LinkedIn from './icons/LinkedIn.svelte';
	import TikTok from './icons/TikTok.svelte';
	import Website from './icons/Website.svelte';
	import Youtube from './icons/Youtube.svelte';

	const options = [
		{ title: 'facebook', component: Facebook },
		{ title: 'imdb', component: Imdb },
		{ title: 'instagram', component: Instagram },
		{ title: 'linkedin', component: LinkedIn },
		{ title: 'tiktok', component: TikTok },
		{ title: 'website', component: Website },
		{ title: 'youtube', component: Youtube }
	];

	const getIconComponent = (title: string) =>
		options.find((option) => option.title === title)?.component;
</script>

{#if links?.length}
	<div>
		{#each links as { href, title }, i}
			<a
				style={`color: ${color};`}
				in:scale={{ delay: (i + 1) * 100 + 500, start: 0 }}
				{href}
				aria-label={title}
			>
				<svelte:component this={getIconComponent(title)} {color} width={size} height={size} />
			</a>
		{/each}
	</div>
{/if}

<style>
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
	}
	a {
		color: var(--textColor);
		transition: all 0.4s;
		margin: 0;
		display: flex;
		align-items: center;
	}
	a:hover {
		/* color: var(--primary); */
		/* color: var(--yellow); */
		transform: scale(0.9);
	}
</style>
