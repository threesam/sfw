<script lang="ts">
	import type { PageData } from './$types'
	import SEO from 'svelte-seo'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import { canonical } from '$lib/utils/site'
	import ProductTile from '$lib/components/ProductTile.svelte'

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
				<ProductTile
					id={product.id}
					name={product.name}
					thumbnail_url={product.thumbnail_url}
					price={product.variants[0]?.retail_price}
					currency={product.variants[0]?.currency}
					headingLevel={2}
				/>
			{/each}
		</div>
	{:else}
		<p class="py-16 text-center opacity-70">
			Nothing in the shop right now. Check back soon.
		</p>
	{/if}
</section>
