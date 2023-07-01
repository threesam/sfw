<script>
	import '../app.css'
	import Cart from '$lib/components/Cart.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { showCart } from '$lib/store'
	import SEO from 'svelte-seo'

	export let data = {}
	const { settings } = data.body
</script>

<SEO
	title={settings.title}
	description={settings.description}
	openGraph={{
		title: settings.title,
		description: settings.description,
		images: [{ url: settings.image.asset.url }]
	}}
/>

<Header />
{#if $showCart}
	<Cart />
{/if}

<main class="min-h-screen pt-16">
	<slot />
</main>

<Footer {data} />
