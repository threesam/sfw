<script>
	export let src = '';
	export let alt = '';
	export let eyebrow = 'Upcoming';
	export let title = 'Skeleton Flowers & Water';
	export let description =
		'Proident sunt quis culpa veniam nulla officia ullamco et reprehenderit do incididunt irure sit. Cillum do proident laborum est. Pariatur tempor elit elit excepteur sit reprehenderit quis.';
</script>

<section>
	{#if src}
		<img {src} {alt} />
	{/if}
	<div class="content">
		<span>{eyebrow}</span>
		<h1>{title}</h1>
		<p>{description}</p>
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		min-width: 100%;
		width: 100vw;
		height: 69vh;
		background: grey;
		padding: 2rem;
	}

	.content {
		max-width: 30rem;
	}
</style>
