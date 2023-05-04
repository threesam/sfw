<script lang="ts">
	import { fly } from 'svelte/transition'
	import ArrowDown from './icons/ArrowDown.svelte'
	import Image from './Image.svelte'

	export let height = 'calc(100vh - var(--headerHeight))'
	export let eyebrow = ''
	export let title = ''
	export let description = ''
	export let slug = ''
	export let path = '/'
	export let image: any = {}

	const { src, alt, color } = image
	const handle = path + slug
</script>

<section
	class="relative flex flex-col items-start justify-start gap-0 overflow-hidden lg:flex-row lg:items-end lg:gap-8"
	style={height && `height: ${height};`}
>
	<Image {src} {alt} />
	<div class="absolute inset-0 bg-gradient-fade" />
	{#if title || description}
		<div
			style={color && `--primary: ${color}`}
			in:fly={{ x: -50, duration: 400 }}
			class="absolute bottom-0 left-0 max-w-lg p-5 lg:p-10"
		>
			<span class="pb-0">{eyebrow}</span>
			<h2 class="pb-3 text-3xl lg:text-4xl" style="color: var(--primary);">{title}</h2>
			<p class="pb-1">{description}</p>
			{#if slug}
				<a
					href={handle}
					class="underline underline-offset-4 transition-all duration-300 hover:text-primary hover:underline-offset-1"
					>learn more</a
				>
			{/if}
		</div>
	{/if}
</section>
