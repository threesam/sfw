<script lang="ts">
	import { urlFor } from '../utils/sanity'
	import { fade } from 'svelte/transition'

	export let src = ''
	export let alt = ''
	export let caption = ''
	export let objectFit = ''
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/e3e7081a77638fa4443c527c2dd4d286c15e888d-1052x1052.jpg'
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
