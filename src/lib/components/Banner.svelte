<script lang="ts">
	import { fly } from 'svelte/transition'
	import Image from './Image.svelte'

	export let height = ''
	export let status = ''
	export let title = ''
	export let description = ''
	export let slug = ''
	export let path = '/'
	export let image: any = {}

	const { src, alt, color } = image
	const handle = path + slug
</script>

<section
	class="relative flex max-h-[94vh] flex-col items-start justify-start gap-0 overflow-hidden lg:flex-row lg:items-end lg:gap-8"
	style={height ? `height: ${height}` : ''}
>
	<Image {src} {alt} />
	<div class={`bg-gradient-fade absolute inset-0 ${height ? 'hidden' : ''}`} />
	{#if title || description}
		<div
			style={color && `--primary: ${color}`}
			in:fly={{ x: -50, duration: 400 }}
			class="absolute bottom-0 left-0 max-w-lg p-5 lg:p-10"
		>
			<span
				class="bg-dark shadow-primary inline-block border border-gray-700 p-3 text-sm tracking-wider text-gray-300 shadow-sm"
				>{status.replace(/-/g, ' ')}</span
			>
			<h2 class="font-display py-3 text-3xl lg:text-4xl" style="color: var(--primary);">{title}</h2>
			<p class="pb-1">{description}</p>
			{#if slug}
				<a
					href={handle}
					class="hover:text-primary underline underline-offset-4 transition-all duration-300 hover:underline-offset-1"
					>learn more</a
				>
			{/if}
		</div>
	{/if}
</section>
