<script lang="ts">
	import imageBuilder from '../utils/imageUrlBuilder';
	export let src = '';
	export let alt: '';
	export let h: number;
	export let w: number;
	export let mainImage;
	console.log('mainImage', mainImage);

	import { fade } from 'svelte/transition';
</script>

<figure>
	{#if mainImage?.hasOwnProperty('hotspot')}
		<img
			in:fade
			height={h}
			width={w}
			src={imageBuilder(src)
				.size(w, h)
				.fit('crop')
				.crop('focalpoint')
				.focalPoint(mainImage.hotspot.x, mainImage.hotspot.y)
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
</figure>

<style>
	figure {
		margin: 0;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: relative;
		z-index: -10;
	}
</style>
