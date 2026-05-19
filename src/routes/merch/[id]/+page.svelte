<script lang="ts">
	import { cartItems, showCart, type CartItem } from '$store'
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { trackCart } from '$utils/umami'
	import DescriptionToggle from '$components/DescriptionToggle.svelte'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import SEO from 'svelte-seo'
	import type { PrintfulSyncVariant } from '$types'

	const SITE = 'https://skeletonflowersandwater.com'

	let { data }: { data: PageData } = $props()

	const { product } = data.body
	const { variants } = product

	let selectedVariantId = $derived(new URL($page.url).searchParams.get('v'))

	let selectedVariant: (PrintfulSyncVariant & { quantity?: number }) | undefined = $derived(
		variants.find((v) => String(v.id) === String(selectedVariantId)) ?? variants[0]
	)

	function getSize(variant: PrintfulSyncVariant) {
		const parenMatch = variant.product?.name?.match(/\(.*\/\s*(.+?)\)/)
		if (parenMatch) return parenMatch[1]
		const parts = variant.name.split(' - ')
		return parts.length > 1 ? parts[parts.length - 1] : 'one size'
	}

	function selectVariant(id: number | string) {
		goto(`?v=${id}`, { replaceState: true, noScroll: true })
	}

	function addToCart({ variant }: { variant: PrintfulSyncVariant & { quantity?: number } }) {
		let isAlreadyAdded = false
		const items: CartItem[] = []
		$cartItems.forEach((item) => {
			if (variant.id === item.id) {
				isAlreadyAdded = true
				item.quantity++
			}
			items.push(item)
		})

		if (!isAlreadyAdded) {
			variant.quantity = 1
			items.push(variant as CartItem)
		}

		$cartItems = items
		$showCart = true
		trackCart({ variant, type: 'add-to-cart' })
	}

	$effect(() => {
		const first = variants[0]
		if (!selectedVariantId && first) {
			selectVariant(first.id)
		}
	})

	let productLd = $derived({
		'@type': 'Product',
		name: product.name,
		image: product.thumbnail_url,
		brand: { '@type': 'Brand', name: 'Skeleton Flowers and Water' },
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: variants[0]?.currency ?? 'USD',
			lowPrice: Math.min(...variants.map((v) => Number(v.retail_price) || 0)),
			highPrice: Math.max(...variants.map((v) => Number(v.retail_price) || 0)),
			offerCount: variants.length,
			availability: 'https://schema.org/InStock',
			url: SITE + $page.url.pathname,
		},
	})
</script>

<SEO
	title={`${product.name} — Skeleton Flowers and Water`}
	description={`${product.name} — limited apparel from Skeleton Flowers and Water.`}
	openGraph={{
		title: product.name,
		type: 'website',
		images: product.thumbnail_url ? [{ url: product.thumbnail_url }] : [],
	}}
/>

<JsonLd data={productLd} />

<section class="mx-auto max-w-7xl p-5">
	{#if product && selectedVariant}
		<div class="flex max-w-full flex-col md:flex-row">
			<img
				class="bg-gradient-to-tr from-slate-700 md:w-2/3"
				src={product.thumbnail_url}
				alt="product - {product.name}"
			/>

			<div class="h-full md:w-1/3 lg:pl-10">
				<h1 class="font-display pt-5 text-4xl">{product.name}</h1>

				<p class="mb-3 text-lg">
					<b>{selectedVariant.retail_price}</b>
					{selectedVariant.currency}
				</p>

				<div class="mb-8 pt-5">
					<h4 class="mb-2 text-base font-semibold uppercase tracking-wide">Size</h4>
					<div class="flex gap-3">
						{#each variants as variant}
							<button
								onclick={() => selectVariant(variant.id)}
								class={`${
									selectedVariant?.id === variant.id
										? 'text-dark bg-gradient-to-tr from-slate-100 to-gray-500 font-extrabold'
										: ''
								} flex h-12 w-24 items-center justify-center border transition duration-300 ease-in-out hover:scale-95 hover:opacity-100`}
							>
								{getSize(variant)}
							</button>
						{/each}
					</div>
				</div>

				<button
					onclick={() => {
						const v = selectedVariant ?? variants[0]
						if (v) addToCart({ variant: v })
					}}
					class="hover:bg-primary hover:text-dark hover:border-primary flex w-full items-center justify-center border p-4 text-white opacity-90 transition-all duration-300 hover:font-bold"
				>
					<span class="font-display text-lg uppercase">Add To Cart</span>
				</button>
				<p class="py-3 text-xs italic text-red-500">
					<b class="uppercase">final sale:</b> custom item not subject to returns.
				</p>
				<DescriptionToggle
					title="Shipping Details"
					description="US Orders only, shipping included for limited time."
				/>
			</div>
		</div>
	{/if}
</section>
