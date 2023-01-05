<script>
	export let src = '';
	export let alt = '';
	export let imagePalette = {};
	export let eyebrow = '';
	export let title = '';
	export let description = '';
	export let slug = '';
	export let path = '/';
	const handle = path + slug;

	import { fly } from 'svelte/transition';

	import ArrowDown from './icons/ArrowDown.svelte';
</script>

<section>
	{#if src}
		<img {src} {alt} />
	{/if}
	{#if title || description}
		<div in:fly={{ x: -50, duration: 400 }} class="content">
			<span>{eyebrow}</span>
			<h2>{title}</h2>
			<p>{description}</p>
			<a href={handle} class="link">learn more</a>
		</div>
	{/if}
	<div class="arrow">
		<ArrowDown width={40} height={40} color="var(--primary)" />
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: flex-start;
		gap: 2rem;
		align-items: flex-end;
		height: calc(100vh - 3rem);
		background: linear-gradient(rgba(0, 0, 0, 0), black);
	}

	.content {
		max-width: 30rem;
		padding: 3rem 2rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		position: absolute;
		z-index: -1;
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
		bottom: 2rem;
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
