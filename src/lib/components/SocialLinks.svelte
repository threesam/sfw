<script lang="ts">
	type Link = {
		title: string
		href: string
	}

	import { scale } from 'svelte/transition'

	export let color = 'var(--background)'
	export let size = 69
	export let links: Link[] = []

	import Backstage from './icons/Backstage.svelte'
	import Facebook from './icons/Facebook.svelte'
	import Imdb from './icons/Imdb.svelte'
	import Instagram from './icons/Instagram.svelte'
	import LinkedIn from './icons/LinkedIn.svelte'
	import TikTok from './icons/TikTok.svelte'
	import Website from './icons/Website.svelte'
	import Youtube from './icons/Youtube.svelte'

	const options = [
		{ title: 'facebook', component: Facebook },
		{ title: 'backstage', component: Backstage },
		{ title: 'imdb', component: Imdb },
		{ title: 'instagram', component: Instagram },
		{ title: 'linkedin', component: LinkedIn },
		{ title: 'tiktok', component: TikTok },
		{ title: 'website', component: Website },
		{ title: 'youtube', component: Youtube }
	]

	const validLinks = links.filter((link) => options.map(({ title }) => title).includes(link.title))

	function getIconComponent(title: string) {
		return options.find((option) => option.title === title)?.component
	}
</script>

{#if links?.length}
	<div class="flex justify-start gap-5">
		{#each validLinks as { href, title }, i}
			<a
				class="transition-all duration-300 hover:scale-95"
				style={`color: ${color};`}
				in:scale={{ delay: (i + 1) * 100, start: 0 }}
				{href}
				aria-label={title}
			>
				<svelte:component this={getIconComponent(title)} {color} width={size} height={size} />
			</a>
		{/each}
	</div>
{/if}
