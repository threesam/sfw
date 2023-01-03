<script>
	export let data = {};
	import { sanityData } from '$lib/stores/sanity.ts';
	sanityData.set(data);

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
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
