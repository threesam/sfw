<script lang="ts">
	export let height = '';
	export let eyebrow = '';
	export let title = '';
	export let description = '';
	export let slug = '';
	export let path = '/';
	export let image = {};
	const { src, alt, color, hotspot, crop } = image;
	const handle = path + slug;

	import { fly } from 'svelte/transition';
	let h: number;
	let w: number;

	import ArrowDown from './icons/ArrowDown.svelte';
	import Image from './Image.svelte';
</script>

<section bind:clientWidth={w} bind:clientHeight={h} style={height && `height: ${height};`}>
	{#if src && w && h}
		<Image {w} {h} {src} {alt} {hotspot} {crop} />
	{/if}
	{#if title || description}
		<div in:fly={{ x: -50, duration: 400 }} class="content">
			<span>{eyebrow}</span>
			<h2 style={color && `color: ${color}`}>{title}</h2>
			<p>{description}</p>
			{#if slug}
				<a href={handle} class="link">learn more</a>
			{/if}
		</div>
	{/if}
	{#if !height}
		<div class="arrow">
			<ArrowDown width={40} height={40} color="var(--primary)" />
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		display: flex;
		justify-content: flex-start;
		gap: 2rem;
		align-items: flex-end;
		height: calc(100vh - var(--headerHeight));
		background: linear-gradient(rgba(0, 0, 0, 0), black);
		overflow: hidden;
	}

	.content {
		position: absolute;
		max-width: 30rem;
		padding: 3rem var(--containerPadding);
		bottom: 0;
		left: 0;
	}
	p {
		margin-bottom: 0;
	}
	h2 {
		margin: 0;
		margin-top: 0.5rem;
	}

	.arrow {
		position: absolute;
		bottom: var(--containerPadding);
		right: 1rem;
		width: 3rem;
	}

	@media (max-width: 768px) {
		section {
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
		}
		.content {
			padding: 0 1rem 3rem 1rem;
		}
		img {
			position: inherit;
		}
		.arrow {
			right: 0.5rem;
			bottom: 1.5rem;
			display: none;
		}
	}
</style>
