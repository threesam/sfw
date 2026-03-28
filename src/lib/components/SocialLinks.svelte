<script lang="ts">
	import type { Component } from 'svelte'
	type Link = {
		title: string
		href: string
	}

	import { scale } from 'svelte/transition'

	let { color = 'var(--background)', size = 69, links = [] as Link[] } = $props()

	import Backstage from './icons/Backstage.svelte'
	import Facebook from './icons/Facebook.svelte'
	import Imdb from './icons/Imdb.svelte'
	import Instagram from './icons/Instagram.svelte'
	import LinkedIn from './icons/LinkedIn.svelte'
	import TikTok from './icons/TikTok.svelte'
	import Website from './icons/Website.svelte'
	import Youtube from './icons/Youtube.svelte'

	const options: { title: string; component: Component }[] = [
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
			{@const IconComp = getIconComponent(title)}
			<a
				class="transition-all duration-300 hover:scale-95"
				style={`color: ${color};`}
				in:scale={{ delay: (i + 1) * 100, start: 0 }}
				{href}
				aria-label={title}
			>
				{#if IconComp}
					<IconComp {color} width={size} height={size} />
				{/if}
			</a>
		{/each}
	</div>
{/if}
