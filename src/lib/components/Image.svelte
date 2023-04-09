<script lang="ts">
	import imageBuilder from '../utils/imageUrlBuilder';
	export let src = '';
	export let alt: '';
	export let caption = '';
	export let hotspot = null;
	export let crop = null;
	export let h: number;
	export let w: number;
	export let defaultSrc =
		'https://cdn.sanity.io/images/4yxngtwt/production/42c583f33f8b7a507fa0b80668904ec5688bb86e-1052x1052.png';
	export let defaultAlt = 'Skeleton Flowers + Water';

	import { fade } from 'svelte/transition';
</script>

<figure>
	{#if src}
		{#if hotspot}
			<img
				in:fade
				height={h}
				width={w}
				src={imageBuilder(src)
					.size(w, h)
					.fit('crop')
					.crop('focalpoint')
					.focalPoint(hotspot.x, hotspot.y)
					.url()}
				{alt}
			/>
		{:else}
			<img
				in:fade
				height={h}
				width={w}
				src={imageBuilder(src).size(w, h).fit('crop').crop('entropy').url()}
				{alt}
			/>
		{/if}
		{#if caption}
			<figcaption>{caption}</figcaption>
		{/if}
	{:else}
		<!-- DEFAULT IMAGE -->
		<img
			src={imageBuilder(defaultSrc).size(w, h).fit('crop').crop('entropy').url()}
			alt={defaultAlt}
		/>
	{/if}
</figure>

<style lang="scss">
	figure {
		margin: 0;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			position: relative;
			z-index: -10;
		}

		figcaption {
			color: transparent;
		}
	}
</style>
