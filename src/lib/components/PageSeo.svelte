<script lang="ts">
	// The one place a page's meta tags come from. The layout renders none: svelte-seo
	// cannot dedupe, so a layout default plus a page override shipped two
	// descriptions and two og:titles, and crawlers read the generic first one.
	import SEO from 'svelte-seo'
	import { page } from '$app/state'
	import { optimize } from '#lib/utils/img.js'
	import { canonical } from '#lib/utils/site.js'
	import type { LayoutData } from '../../routes/$types'

	let {
		title,
		description,
		ogTitle,
		image,
		type = 'website'
	}: {
		title: string
		description?: string | null
		ogTitle?: string
		image?: string | null
		type?: string
	} = $props()

	let settings = $derived((page.data as LayoutData).settings)
	let desc = $derived(description || settings?.description || '')
	let img = $derived(image || optimize(settings?.image?.asset?.url, { w: 1200 }) || '')
	let social = $derived(ogTitle ?? title)
	let url = $derived(canonical(page.url.pathname))
</script>

<SEO
	{title}
	description={desc}
	openGraph={{ title: social, description: desc, url, type }}
	twitter={{ card: 'summary_large_image', title: social, description: desc, image: img }}
/>

<svelte:head>
	<link rel="canonical" href={url} />
	<!-- svelte-seo writes og:image:url, which some link-preview scrapers ignore -->
	{#if img}
		<meta property="og:image" content={img} />
	{/if}
</svelte:head>
