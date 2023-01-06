<script>
	export let title = '';
	export let src = '';
	export let alt = '';
	export let caption = '';
	export let description = '';
</script>

<div class="slide">
	<img {src} {alt} />
	<h5>{title}</h5>
	<p>{description}</p>
</div>

<style>
	.slide {
		height: 100%;
	}
	img {
		height: 100%;
	}
	h5 {
		margin-top: 0.5rem;
	}
</style>
