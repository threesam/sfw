<script>
	import Pencil from './Pencil.svelte';
	import Nav from './Nav.svelte';
</script>

<header>
	<Pencil />
	<div class="container">
		<a href="/">
			<h3>Skeleton Flowers & Water</h3>
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
		color: lavender;
	}
	a {
		text-decoration: none;
	}
	header img {
		height: 100%;
		width: auto;
	}
</style>
