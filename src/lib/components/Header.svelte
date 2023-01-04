<script>
	import Pencil from './Pencil.svelte';
	import Nav from './Nav.svelte';

	let w;
</script>

<svelte:window bind:innerWidth={w} />

<header>
	<Pencil />
	<div class="container">
		<a href="/">
			{#if w > 768}
				<h3>Skeleton Flowers & Water</h3>
			{:else}
				<h3>SF+W</h3>
			{/if}
		</a>
		<!-- <img
			src="https://cdn.discordapp.com/attachments/1039738613606395925/1053866314655072266/sfw.png"
			alt="abstract skeleton flowers and water"
		/> -->
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
		height: 3rem;
		padding: 1rem 2rem;
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
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
	}
</style>
