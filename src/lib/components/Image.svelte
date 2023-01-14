<script lang="ts">
	import imageBuilder from '../utils/imageUrlBuilder';
	export let src = '';
	export let alt: '';
	export let caption = '';
	export let hotspot = null;
	export let crop = null;
	export let h: number;
	export let w: number;

	import { fade } from 'svelte/transition';
</script>

<figure>
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
</figure>

<style lang="scss">
	figure {
		margin: 0;

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
