<script>
	export let src = '';
	export let alt = '';
	export let caption = '';
	export let imagePalette = null;
	export let title = '';
	export let description = '';
	export let path = '/';
	export let slug = '';
	export let buttonText = 'learn more';
</script>

<section>
	<figure>
		<img {src} {alt} />
		<figcaption>{caption}</figcaption>
	</figure>
	<div class="content">
		<h3 style={imagePalette && `color: ${imagePalette.lightVibrant.background}`}>{title}</h3>
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
	}

	section:nth-child(odd) {
		flex-direction: row-reverse;

		.content {
			align-items: flex-end;
			text-align: right;
		}

		h3 {
			text-align: right;
		}
	}

	figure {
		margin: 0;
		overflow: hidden;
	}

	img {
		height: 100%;
		object-fit: cover;
	}

	img:hover {
		transform: scale(1.02);
		transition: 0.4s all ease-in;
	}

	h3 {
		margin: 0;
		text-align: left;
	}

	.content {
		max-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0;
		padding: 2rem;
		text-align: left;
	}

	section .content,
	section figure {
		width: 50%;
	}

	@media (max-width: 768px) {
		section {
			flex-direction: column;
			padding-top: 5rem;
		}
		section:nth-child(odd) {
			flex-direction: column;
		}
		section:nth-child(odd) .content {
			align-items: flex-start;
			text-align: left;
		}

		section .content {
			padding: 1rem;
		}
		section .content,
		section figure {
			width: unset;
		}

		h3 {
			text-align: left;
		}
	}
</style>
