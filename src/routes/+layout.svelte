<script>
	export let data = {};
	import { sanityData } from '$lib/stores/sanity.ts';
	sanityData.set(data);

	import { page } from '$app/stores';
	const route = $page?.route?.id || '';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

{#if route !== '/contact'}
	<Footer />
{/if}

<style>
	main {
		max-width: 100%;
		width: 100%;
		min-height: calc(100vh - 3rem);
		display: flex;
		flex-direction: column;
	}
</style>
