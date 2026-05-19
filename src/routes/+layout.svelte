<script lang="ts">
	import '../app.css'
	import Cart from '$lib/components/Cart.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { showCart } from '$lib/store'
	import SEO from 'svelte-seo'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children: Snippet } = $props()

	let settings = $derived(data.body.settings)
</script>

<SEO
	title={settings?.title}
	description={settings?.description}
	openGraph={{
		title: settings?.title ?? '',
		description: settings?.description ?? '',
		images: [{ url: settings?.image?.asset?.url ?? '' }],
	}}
/>

<Header />
{#if $showCart}
	<Cart />
{/if}

<main class="min-h-screen pt-16">
	{@render children()}
</main>

<Footer {data} />
