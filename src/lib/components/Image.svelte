<script lang="ts">
	import { urlFor } from '../utils/sanity/client'
	import { fade } from 'svelte/transition'

	export let src = ''
	export let alt = ''
	export let caption = ''
	export let objectFit = ''
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/df0b294263b9284c4c170bb80d500b594a220138-1024x1024.jpg'
	export let defaultAlt = 'Skeleton Flowers + Water'

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
