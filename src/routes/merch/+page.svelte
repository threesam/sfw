<script lang="ts">
	import type { PageData } from './$types'
	import SEO from 'svelte-seo'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import { canonical } from '$lib/utils/site'
	import { track } from '$lib/utils/umami'

	let { data }: { data: PageData } = $props()

	const { products } = data.body

	const itemListLd = {
		'@type': 'ItemList',
		name: 'Merch by Skeleton Flowers and Water',
		itemListElement: products.map((product, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: canonical(`/merch/${product.id}`),
			name: product.name,
		})),
	}
</script>

<SEO
	title="Merch - Skeleton Flowers and Water"
	description="Shirts, beanies, stickers and the rest, from Skeleton Flowers and Water."
/>
<JsonLd data={itemListLd} />

<section class="bg-dark bg-gradient-3 relative grid h-32 w-full place-content-center lg:h-64">
	<h1 class="text-bold font-display text-dark relative z-0 text-center text-3xl lg:text-5xl">
		Merch
	</h1>
</section>

<section class="mx-auto max-w-6xl px-5 py-16 lg:px-10">
	{#if products.length}
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
			{#each products as product}
				<a
					href="/merch/{product.id}"
					class="block"
					onclick={() =>
						// Same event name and payload as the homepage tile so the two entry
						// points aggregate together in umami rather than splitting the funnel.
						track('product-click', { id: String(product.id), name: product.name })}
				>
					<img
						class="mb-2 aspect-square w-full bg-gradient-to-tr from-slate-700 object-cover"
						src={product.thumbnail_url}
						alt={product.name}
						loading="lazy"
						decoding="async"
						width="600"
						height="600"
					/>
					<h2 class="font-display text-2xl">{product.name}</h2>
					<p class="text-sm">
						{product.variants[0]?.retail_price}
						<span class="opacity-70">{product.variants[0]?.currency}</span>
					</p>
				</a>
			{/each}
		</div>
	{:else}
		<p class="py-16 text-center opacity-70">
			Nothing in the shop right now. Check back soon.
		</p>
	{/if}
</section>
