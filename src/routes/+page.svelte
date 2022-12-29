<script>
	import Banner from '$lib/components/Banner.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
</script>

<Banner />

<div class="side-by-side">
	<img
		src="https://cdn.discordapp.com/attachments/1039738613606395925/1053866314655072266/sfw.png"
		alt="abstract skeleton flowers and water"
	/>
	<div class="content">
		<h3>About Skeleton Flowers</h3>
		<p>
			Dolor consectetur amet duis voluptate Lorem nostrud aute anim eiusmod eu cillum sunt
			consectetur tempor. Exercitation dolore quis elit eu. Pariatur voluptate exercitation aute
			pariatur labore nisi incididunt adipisicing nulla ea. Ipsum nisi et deserunt do dolor dolore
			adipisicing cillum incididunt pariatur laboris. Anim fugiat sunt excepteur enim est qui sit.
			Fugiat qui proident anim adipisicing consectetur exercitation duis ad irure. Do cillum do
			velit anim occaecat est.
		</p>
	</div>
</div>

<Carousel />

<style>
	.side-by-side {
		height: 69vh;
		max-width: 100%;
		display: flex;
		padding: 2rem;
		gap: 2rem;
		position: relative;
	}
	.content {
		height: 100%;
		display: grid;
		place-content: center;
	}
	img {
		width: auto;
		height: 100%;
		object-fit: contain;
	}
</style>
