<script lang="ts">
	import { fly } from 'svelte/transition'
	import ArrowDown from './icons/ArrowDown.svelte'
	import Image from './Image.svelte'

	export let height = 'calc(100vh - var(--headerHeight))'
	export let eyebrow = ''
	export let title = ''
	export let description = ''
	export let slug = ''
	export let path = '/'
	export let image: any = {}

	const { src, alt, color } = image
	const handle = path + slug
</script>

<section class="relative" style={height && `height: ${height};`}>
	<Image {src} {alt} />
	<div class="absolute inset-0 bg-gradient-fade" />
	{#if title || description}
		<div style={color && `--primary: ${color}`} in:fly={{ x: -50, duration: 400 }} class="content">
			<span class="pb-0">{eyebrow}</span>
			<h2 class="pb-3 text-3xl lg:text-4xl" style="color: var(--primary);">{title}</h2>
			<p class="pb-1">{description}</p>
			{#if slug}
				<a
					href={handle}
					class="underline underline-offset-4 transition-all duration-300 hover:text-primary hover:underline-offset-1"
					>learn more</a
				>
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

		.content {
			position: absolute;
			max-width: 30rem;
			padding: 3rem var(--containerPadding);
			bottom: 0;
			left: 0;

			h2 {
				margin: 0;
				margin-top: 0.5rem;
			}
		}
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

			.content {
				padding: 0 1rem 3rem 1rem;
			}
		}

		.arrow {
			right: 0.5rem;
			bottom: 1.5rem;
			display: none;
		}
	}
</style>
