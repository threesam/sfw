<script>
	export let title = '';
	export let description = '';
	export let path = '/';
	export let slug = '';
	export let buttonText = 'learn more';
	export let mirrored = true;
	export let image = {};
	const { src, alt, caption, color, hotspot, crop } = image;

	import Image from './Image.svelte';
</script>

<section class:mirrored>
	<div class="image-container">
		<Image {src} {alt} {caption} {hotspot} {crop} />
	</div>
	<div class="content">
		<h3 style={color && `color: ${color}`}>{title}</h3>
		<p>{description}</p>

		{#if slug}
			<a class="link" href={path + slug}>{buttonText}</a>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		height: auto;
		max-height: 100vh;
		display: flex;
		flex-direction: row;

		h3 {
			margin: 0;
			text-align: left;
		}
		.content {
			max-height: 100%;
			min-width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			gap: 0;
			padding: var(--containerPadding);
			text-align: left;
		}

		.content,
		figure {
			width: 50%;
		}

		figure {
			margin: 0;
			overflow: hidden;

			img {
				height: 100%;
				object-fit: cover;
			}

			img:hover {
				transform: scale(1.02);
				transition: 0.4s all ease-in;
			}
		}
	}

	.mirrored:nth-child(odd) {
		flex-direction: row-reverse;

		.content {
			align-items: flex-end;
			text-align: right;
		}

		h3 {
			text-align: right;
		}
	}

	@media (max-width: 768px) {
		section {
			flex-direction: column;
			padding-top: 5rem;

			.content {
				padding: 1rem;
			}
			.content,
			figure {
				width: unset;
			}

			h3 {
				text-align: left;
			}
		}
		.mirrored:nth-child(odd) {
			flex-direction: column;

			.content {
				align-items: flex-start;
				text-align: left;
			}
		}
	}
</style>
