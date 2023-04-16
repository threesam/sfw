<script>
	export let data = {};
	import { sanityData } from '$lib/stores/sanity';
	sanityData.set(data);

	import { page } from '$app/stores';
	const route = $page?.route?.id || '';

	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<!-- <SEO title={data.title} image={data.src} alt={data.alt} /> -->

<Header />

<main class="min-h-screen pt-16">
	<slot />
</main>

{#if route !== '/contact'}
	<Footer {data} />
{/if}
