<script lang="ts">
	import SEO from '$components/SEO.svelte'
	import DescriptionToggle from '$components/DescriptionToggle.svelte'
	import { fade } from 'svelte/transition'
	import { cartItems, cartQuantity, showCart } from '$store'
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data: PageData

	const { product } = data.body

	const { searchParams } = new URL($page.url)
	const selectedVariantId = searchParams.get('v')

	let selectedOptions = {}
	let cartLoading = false

	// product?.variants.forEach(({ sku }) => {
	// 	selectedOptions = { ...selectedOptions, [option.name]: option.values[0] }
	// })

	// selected variant
	type Variant = {
		id: string
		name: string
		price: string
		currency: string
		image: string
	}

	const variants = product?.variants?.reduce((array, v) => {
		array.push({
			currency: v.currency,
			id: v.id,
			image: product.thumbnail_url,
			title: product.name,
			name: v.name.split(' - ').pop(),
			price: v.retail_price
		})
		return array
	}, [])

	$: selectedVariant = null

	function getSelectedVariant(id?: number | null) {
		if (id === null) {
			selectedVariant = variants[0]
			searchParams.set('v', String(variants[0].id))
			goto('?' + searchParams.toString())
		} else {
			selectedVariant = variants.find((variant: Variant) => variant.id === id)
			searchParams.set('v', String(id))
			goto('?' + searchParams.toString())
		}
	}

	function addToCart({ variant }) {
		let isAlreadyAdded = false
		const items = []
		$cartItems.forEach((item) => {
			if (variant.id === item.id) {
				isAlreadyAdded = true
				item.quantity++
			}
			items.push(item)
		})

		if (!isAlreadyAdded) {
			variant.quantity = 1
			items.push(variant)
		}

		$cartItems = items

		$showCart = true
	}

	onMount(() => {
		getSelectedVariant(selectedVariantId)
	})
</script>

<!-- <SEO data={data.body} pageType="product" /> -->

<section class="mx-auto max-w-7xl p-5 lg:p-10">
	{#if product && selectedVariant}
		<div class="flex flex-col gap-10 md:flex-row">
			<!-- IMAGE GALLERY -->
			<!-- <ProductDetailsImageGallery {product} /> -->
			<img src={product.thumbnail_url} alt="product - {product.name}" />

			<!-- DETAILS -->
			<div class="h-full px-6 md:w-1/3">
				<!-- TITLE -->
				<h1 class="font-display mb-3 pt-5 text-4xl">{product.name}</h1>

				<!-- PRICE -->
				<p class="mb-3 text-lg">
					<b>{selectedVariant.price}</b>
					{selectedVariant.currency}
				</p>

				<!-- DESCRIPTION -->
				<!-- <p class="mb-3">{product.description}</p> -->

				<!-- PRODUCT OPTIONS -->
				<div class="mb-8 pt-5">
					<h4 class="mb-2 text-base font-semibold uppercase tracking-wide">Size</h4>
					<div class="flex">
						{#each variants as variant}
							<button
								on:click={() => getSelectedVariant(variant.id)}
								class={`${
									selectedVariant?.id === variant.id ? 'text-red-500' : ''
								} mr-3 flex h-12 items-center justify-center border-2 border-black transition duration-300 ease-in-out hover:scale-95 hover:opacity-100`}
							>
								{variant.name}
							</button>
						{/each}
					</div>
				</div>

				<!-- ADD TO CART -->
				<button
					on:click={addToCart({ variant: selectedVariant })}
					class="bg-dark mt-6 flex w-full items-center justify-center p-4 text-sm uppercase tracking-wide text-white opacity-90 hover:opacity-100"
				>
					<span>Add To Cart</span>
				</button>

				<!-- {#if shippingDetails}
					<DescriptionToggle title="Shipping Details" description={shippingDetails} />
				{/if} -->
			</div>
		</div>
	{/if}
</section>
