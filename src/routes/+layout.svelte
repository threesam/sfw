<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	
	export let data = {};
	
	const route = $page?.route?.id || '';
</script>

<Header />

<main class="min-h-screen pt-16">
	<slot />
</main>

{#if route !== '/contact'}
	<Footer {data} />
{/if}
