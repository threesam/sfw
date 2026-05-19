<script lang="ts">
	import { fade } from 'svelte/transition'
	import { optimize } from '$lib/utils/img'

	export let src: string | null | undefined = ''
	export let alt: string | null | undefined = ''
	export let caption: string | null | undefined = ''
	export let objectFit = ''
	export let width = 1200
	export let priority = false
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg'
	export let defaultAlt = 'Skeleton Flowers + Water'

	if (!src) {
		src = defaultSrc
		alt = defaultAlt
	}

	$: optimized = optimize(src, { w: width })
</script>

<figure class={`h-full max-h-min w-full ${objectFit === 'contain' ? 'aspect-square' : ''}`}>
	{#if optimized}
		<img
			class={`h-full w-full ${
				objectFit === 'contain' ? 'aspect-square object-contain' : 'object-cover'
			}`}
			in:fade
			src={optimized}
			{alt}
			loading={priority ? 'eager' : 'lazy'}
			decoding={priority ? 'sync' : 'async'}
			fetchpriority={priority ? 'high' : 'auto'}
		/>
		{#if caption}
			<figcaption class="hidden">{caption}</figcaption>
		{/if}
	{/if}
</figure>
