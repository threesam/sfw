<script>
	import Pencil from './Pencil.svelte';
	import Nav from './Nav.svelte';

	let w = 0;
</script>

<svelte:window bind:innerWidth={w} />

<header>
	<Pencil />
	<div class="container px-5 lg:px-10">
		<a href="/">
			{#if w > 768}
				<h3 class="text-2xl">Skeleton Flowers & Water</h3>
			{:else}
				<h3 class="text-xl">SF+W</h3>
			{/if}
		</a>
		<Nav />
	</div>
</header>

<style>
	header {
		position: sticky;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background-color: black;
	}
	.container {
		width: 100%;
		max-width: 100%;
		height: var(--headerHeight);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	h3 {
		margin: 0;
		color: var(--textColor);
	}
	a {
		text-decoration: none;
	}
</style>
