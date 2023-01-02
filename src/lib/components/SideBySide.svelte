<script>
	export let src = '';
	export let alt = '';
	export let caption = '';
	export let title = '';
	export let description = '';
	export let path = '/';
	export let slug = '';
	export let buttonText = 'learn more';

	const href = path + slug.current;
</script>

<section>
	<figure>
		<img {src} {alt} />
		<figcaption>{caption}</figcaption>
	</figure>
	<div class="content">
		<h3>{title}</h3>
		<p>{description}</p>
		<a class="link" {href}>{buttonText}</a>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
	}

	section:nth-child(odd) {
		flex-direction: row-reverse;
	}

	section:nth-child(odd) .content {
		align-items: flex-end;
		text-align: right;
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
		text-align: right;
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
</style>
