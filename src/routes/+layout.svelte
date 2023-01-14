<script>
	export let data = {};
	import { sanityData } from '$lib/stores/sanity';
	sanityData.set(data);

	import { page } from '$app/stores';
	const route = $page?.route?.id || '';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO title={data.title} image={data.src} alt={data.alt} />

<Header />

<main>
	<slot />
</main>

{#if route !== '/contact'}
	<Footer />
{/if}

<style lang="scss">
	main {
		max-width: 100%;
		width: 100%;
		min-height: calc(100vh - var(--headerHeight));
		display: flex;
		flex-direction: column;
	}
</style>
