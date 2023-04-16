<script lang="ts">
	import imageBuilder from '../utils/imageUrlBuilder';
	export let src = '';
	export let alt: '';
	export let caption = '';
	export let h: number;
	export let w: number;
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/42c583f33f8b7a507fa0b80668904ec5688bb86e-1052x1052.png';
	export let defaultAlt = 'Skeleton Flowers + Water';

	import { fade } from 'svelte/transition';
</script>

<figure class="max-h-min object-contain">
	{#if src}
		<img
			in:fade
			height={h}
			width={w}
			src={imageBuilder(src).size(w, h).fit('crop').crop('entropy').url()}
			{alt}
		/>
		{#if caption}
			<figcaption class="hidden">{caption}</figcaption>
		{/if}
	{:else}
		<!-- DEFAULT IMAGE -->
		<img
			src={imageBuilder(defaultSrc).size(w, h).fit('crop').crop('entropy').url()}
			alt={defaultAlt}
		/>
	{/if}
</figure>
