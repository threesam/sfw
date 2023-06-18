<script lang="ts">
	import { urlFor } from '../utils/sanity'
	import { fade } from 'svelte/transition'

	export let src = ''
	console.log('src: ', src)
	export let alt = ''
	export let caption = ''
	export let objectFit = ''
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/42c583f33f8b7a507fa0b80668904ec5688bb86e-1052x1052.png'
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
