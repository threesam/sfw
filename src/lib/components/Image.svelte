<script lang="ts">
	import { fade } from 'svelte/transition'
	import { optimize } from '#lib/utils/img.js'

	let {
		src = '',
		alt = '',
		caption = '',
		objectFit = '',
		width = 1200,
		priority = false,
		defaultSrc = 'https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg',
		defaultAlt = 'Skeleton Flowers + Water',
	}: {
		src?: string | null
		alt?: string | null
		caption?: string | null
		objectFit?: string
		width?: number
		priority?: boolean
		defaultSrc?: string
		defaultAlt?: string
	} = $props()

	let resolvedSrc = $derived(src || defaultSrc)
	let resolvedAlt = $derived(src ? alt || '' : defaultAlt)
	let optimized = $derived(optimize(resolvedSrc, { w: width }))
	// Sanity asset filenames end in -<w>x<h>.<ext>. Handing the browser that ratio
	// reserves the box before the lazy image arrives, so the content below it
	// doesn't jump (it measured CLS 0.23 on /about). Other hosts: no hint.
	let dims = $derived(resolvedSrc.match(/-(\d+)x(\d+)\.\w+$/))
</script>

<figure class={`h-full max-h-min w-full ${objectFit === 'contain' ? 'aspect-square' : ''}`}>
	{#if optimized}
		<img
			class={`h-full w-full ${
				objectFit === 'contain' ? 'aspect-square object-contain' : 'object-cover'
			}`}
			in:fade
			src={optimized}
			width={dims?.[1]}
			height={dims?.[2]}
			alt={resolvedAlt}
			loading={priority ? 'eager' : 'lazy'}
			decoding={priority ? 'sync' : 'async'}
			fetchpriority={priority ? 'high' : 'auto'}
		/>
		{#if caption}
			<figcaption class="hidden">{caption}</figcaption>
		{/if}
	{/if}
</figure>
