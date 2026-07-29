<script lang="ts">
	import { track } from '$lib/utils/umami'

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
	}: {
		id: string | number
		name: string
		/** Printful returns null when a product has no preview rendered yet. */
		thumbnail_url?: string | null
		price?: string | number | null
		currency?: string | null
		/** 3 under the homepage's "Shop" h2; 2 on /merch where the h1 is the page title. */
		headingLevel?: 2 | 3
	} = $props()
</script>

<a
	href="/merch/{id}"
	class="block"
	onclick={() =>
		// JS track instead of data-umami-event: the auto-tracker preventDefaults
		// tagged same-tab anchors and re-navigates via location.href, which would
		// turn this internal link into a full page reload.
		track('product-click', { id: String(id), name })}
>
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
