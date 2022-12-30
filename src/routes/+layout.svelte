<script>
	export let data = {};
	console.log('data', data);

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		max-width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
