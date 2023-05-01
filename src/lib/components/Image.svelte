<script lang="ts">
	import imageBuilder from '../utils/imageUrlBuilder';
	import { fade } from 'svelte/transition';

	export let src = '';
	export let alt = '';
	export let caption = '';
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/42c583f33f8b7a507fa0b80668904ec5688bb86e-1052x1052.png';
	export let defaultAlt = 'Skeleton Flowers + Water';

	if (!src) {
		src = defaultSrc
		alt = defaultAlt
	}
</script>

<figure class="max-h-min object-contain w-full">
	{#if src}
		<img
			in:fade
			src={imageBuilder(src).auto('format').fit('crop').crop('entropy').url()}
			{alt}
		/>
		{#if caption}
			<figcaption class="hidden">{caption}</figcaption>
		{/if}
	{/if}
</figure>
