<script lang="ts">
	import { track } from '$lib/utils/umami'
	import { preloadData, pushState, goto } from '$app/navigation'

	// The homepage preview and the /merch index both render this. Sharing the
	// component is what actually keeps the two entry points identical, and it
	// means the click event stays one payload shape so the funnel aggregates in
	// umami rather than splitting across two hand-copied call sites.
	let {
		id,
		name,
		thumbnail_url,
		price,
		currency,
		headingLevel = 3,
		preview = true,
	}: {
		id: string | number
		name: string
		/** Printful returns null when a product has no preview rendered yet. */
		thumbnail_url?: string | null
		price?: string | number | null
		currency?: string | null
		/** 3 under the homepage's "Shop" h2; 2 on /merch where the h1 is the page title. */
		headingLevel?: 2 | 3
		/** Open the sheet instead of navigating. Off leaves it a plain link. */
		preview?: boolean
	} = $props()

	// Shallow routing: push the product's own URL and hang the already-loaded page
	// data off the history entry, so the sheet opens with no navigation while the
	// address bar still reads /merch/<id>. Back closes it. A direct hit or reload
	// gets the full page, because page.state is empty on the first document.
	//
	// This stays a real <a href> so middle-click, cmd-click, "open in new tab" and
	// crawlers all keep working; we only take over the plain left click.
	async function onclick(event: MouseEvent) {
		// Same payload as before so the funnel keeps aggregating in umami.
		track('product-click', { id: String(id), name })

		if (
			!preview ||
			event.shiftKey ||
			event.metaKey ||
			event.ctrlKey ||
			event.altKey ||
			event.button !== 0
		)
			return

		const href = (event.currentTarget as HTMLAnchorElement).href
		event.preventDefault()

		const result = await preloadData(href)
		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { product: result.data as App.PageState['product'] })
		} else {
			// Preload failed, so fall back to a real navigation rather than
			// silently doing nothing on a click the user made.
			goto(href)
		}
	}
</script>

<a href="/merch/{id}" class="block" {onclick}>
	<img
		class="mb-2 aspect-square w-full bg-gradient-to-tr from-slate-700 object-cover"
		src={thumbnail_url}
		alt={name}
		loading="lazy"
		decoding="async"
		width="600"
		height="600"
	/>
	{#if headingLevel === 2}
		<h2 class="font-display text-2xl">{name}</h2>
	{:else}
		<h3 class="font-display text-2xl">{name}</h3>
	{/if}
	<p class="text-sm">
		{price}
		<span class="opacity-70">{currency}</span>
	</p>
</a>
