<script>
	import '../app.css'
	import Cart from '$lib/components/Cart.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { page } from '$app/stores'
	import { showCart } from '$lib/store'

	export let data = {}

	const route = $page?.route?.id || ''
</script>

<Header />
{#if $showCart}
	<Cart />
{/if}

<main class="min-h-screen pt-16">
	<slot />
</main>

{#if route !== '/contact'}
	<Footer {data} />
{/if}
