<script lang="ts">
	import { urlFor } from '../utils/sanity/client'
	import { fade } from 'svelte/transition'

	let {
		src = '',
		alt = '',
		caption = '',
		objectFit = '',
		defaultSrc = 'https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg',
		defaultAlt = 'Skeleton Flowers + Water'
	} = $props()

	if (!src) {
		src = defaultSrc
		alt = defaultAlt
	}
</script>

<figure class={`h-full max-h-min w-full ${objectFit === 'contain' ? 'aspect-square' : ''}`}>
	{#if src}
		<img
			class={`h-full w-full ${
				objectFit === 'contain' ? 'aspect-square object-contain' : 'object-cover'
			}`}
			in:fade
			src={urlFor(src).auto('format').url()}
			{alt}
		/>
		{#if caption}
			<figcaption class="hidden">{caption}</figcaption>
		{/if}
	{/if}
</figure>
