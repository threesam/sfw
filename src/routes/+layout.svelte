<script lang="ts">
	import '../app.css'
	import Cart from '$lib/components/Cart.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import { showCart } from '$lib/store'
	import SEO from 'svelte-seo'
	import { page } from '$app/stores'
	import { optimize } from '$lib/utils/img'
	import { canonical, SITE_URL } from '$lib/utils/site'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children: Snippet } = $props()

	let settings = $derived(data.body.settings)
	let pageUrl = $derived(canonical($page.url.pathname))
	let ogImage = $derived(optimize(settings?.image?.asset?.url, { w: 1200 }) ?? '')

	let organizationLd = $derived({
		'@type': 'Organization',
		name: 'Skeleton Flowers and Water',
		alternateName: 'SF+W',
		url: SITE_URL,
		logo: ogImage,
		description: settings?.description,
		foundingDate: '2020',
		founder: (settings?.founders ?? []).map((f) => ({ '@type': 'Person', name: f.name })),
		sameAs: (settings?.links ?? []).map((l) => l.href),
	})
</script>

<svelte:head>
	<link rel="canonical" href={pageUrl} />
</svelte:head>

<SEO
	title={settings?.title}
	description={settings?.description}
	openGraph={{
		title: settings?.title ?? '',
		description: settings?.description ?? '',
		url: pageUrl,
		type: 'website',
		images: ogImage ? [{ url: ogImage, width: 1200, height: 1200 }] : [],
	}}
	twitter={{
		card: 'summary_large_image',
		title: settings?.title ?? '',
		description: settings?.description ?? '',
		image: ogImage,
	}}
/>

<JsonLd data={organizationLd} />

<Header />
{#if $showCart}
	<Cart />
{/if}

<main class="min-h-screen pt-16">
	{@render children()}
</main>

<Footer {data} />
