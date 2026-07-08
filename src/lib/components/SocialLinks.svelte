<script lang="ts">
	import { scale } from 'svelte/transition'
	import Backstage from './icons/Backstage.svelte'
	import Facebook from './icons/Facebook.svelte'
	import Imdb from './icons/Imdb.svelte'
	import Instagram from './icons/Instagram.svelte'
	import LinkedIn from './icons/LinkedIn.svelte'
	import TikTok from './icons/TikTok.svelte'
	import Website from './icons/Website.svelte'
	import Youtube from './icons/Youtube.svelte'

	type Link = {
		title: string
		href: string
	}

	let {
		color = 'var(--background)',
		size = 69,
		links = [] as Link[],
		location = undefined,
	}: {
		color?: string | null
		size?: number
		links?: Link[]
		location?: string
	} = $props()

	const options = [
		{ title: 'facebook', component: Facebook },
		{ title: 'backstage', component: Backstage },
		{ title: 'imdb', component: Imdb },
		{ title: 'instagram', component: Instagram },
		{ title: 'linkedin', component: LinkedIn },
		{ title: 'tiktok', component: TikTok },
		{ title: 'website', component: Website },
		{ title: 'youtube', component: Youtube },
	]

	let iconColor = $derived(color ?? undefined)
	const validLinks = links.filter((link) => options.map(({ title }) => title).includes(link.title))

	function getIconComponent(title: string) {
		return options.find((option) => option.title === title)?.component
	}
</script>

{#if links?.length}
	<div class="flex justify-start gap-5">
		{#each validLinks as { href, title }, i}
			{@const Comp = getIconComponent(title)}
			<a
				class="transition-all duration-300 hover:scale-95"
				style={`color: ${color};`}
				in:scale={{ delay: (i + 1) * 100, start: 0 }}
				{href}
				aria-label={title}
				data-umami-event="social-click"
				data-umami-event-platform={title}
				data-umami-event-location={location}
			>
				{#if Comp}
					<Comp color={iconColor} width={size} height={size} />
				{/if}
			</a>
		{/each}
	</div>
{/if}
