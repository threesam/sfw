<script lang="ts">
	import { fly } from 'svelte/transition'
	import Image from './Image.svelte'

	let {
		height = '',
		status = '',
		title = '',
		description = '',
		slug = '',
		path = '/',
		image = {} as any,
	}: {
		height?: string
		status?: string
		title?: string
		description?: string
		slug?: string
		path?: string
		image?: { src?: string | null; alt?: string | null; color?: string | null }
	} = $props()

	const handle = path + slug
</script>

<section
	class="relative flex max-h-[94vh] min-h-[70vh] flex-col items-start justify-start gap-0 overflow-hidden lg:flex-row lg:items-end lg:gap-8"
	style={height ? `height: ${height}` : ''}
>
	<Image src={image.src} alt={image.alt} priority width={1600} />
	<div class={`bg-gradient-fade absolute inset-0 ${height ? 'hidden' : ''}`}></div>
	{#if title || description}
		<div
			style={image.color ? `--primary: ${image.color}` : ''}
			in:fly={{ x: -50, duration: 400 }}
			class="absolute bottom-0 left-0 max-w-lg p-5 lg:p-10"
		>
			<span class="text-sm uppercase text-gray-300">{status.replace(/-/g, ' ')}</span>
			<h1 class="font-display py-2 text-3xl lg:text-6xl" style="color: var(--primary);">{title}</h1>
			<p>{description}</p>
			{#if slug}
				<a
					href={handle}
					class="hover:text-primary inline-block pt-5 underline underline-offset-4 transition-all duration-300 hover:underline-offset-1"
					>learn more</a
				>
			{/if}
		</div>
	{/if}
</section>
