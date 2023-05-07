<script lang="ts">
	// import DescriptionToggle from '$components/DescriptionToggle.svelte'
	import { cartItems, showCart } from '$store'
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data: PageData

	const { product } = data.body
	const { variants } = product

	const { searchParams } = new URL($page.url)
	$: selectedVariantId = searchParams.get('v')

	$: selectedVariant = null

	function getSelectedVariant(id?: number | null) {
		console.log('id: ', id)
		if (id === null) {
			selectedVariant = variants[0]
			searchParams.set('v', String(variants[0].id))
			goto('?' + searchParams.toString())
		} else {
			selectedVariant = variants.find((variant) => String(variant.id) === String(id))
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

<section class="mx-auto max-w-7xl p-5">
	{#if product && selectedVariant}
		<div class="flex max-w-full flex-col md:flex-row">
			<!-- IMAGE GALLERY -->
			<!-- <ProductDetailsImageGallery {product} /> -->
			<img class="p-5 md:w-2/3" src={product.thumbnail_url} alt="product - {product.name}" />

			<!-- DETAILS -->
			<div class="h-full md:w-1/3 lg:pl-10">
				<!-- TITLE -->
				<h1 class="font-display mb-3 pt-5 text-4xl">{product.name}</h1>

				<!-- PRICE -->
				<p class="mb-3 text-lg">
					<b>{selectedVariant.retail_price}</b>
					{selectedVariant.currency}
				</p>

				<!-- DESCRIPTION -->
				<!-- <p class="mb-3">{product.description}</p> -->

				<!-- PRODUCT OPTIONS -->
				<div class="mb-8 pt-5">
					<h4 class="mb-2 text-base font-semibold uppercase tracking-wide">Size</h4>
					<div class="flex gap-3">
						{#each variants as variant}
							<button
								on:click={() => getSelectedVariant(variant.id)}
								class={`${
									selectedVariant?.id === variant.id
										? 'bg-gradient-to-tr from-slate-100 to-gray-500 font-extrabold text-black'
										: ''
								} flex h-12 w-24 items-center justify-center border transition duration-300 ease-in-out hover:scale-95 hover:opacity-100`}
							>
								{variant.name.split(' - ').pop()}
							</button>
						{/each}
					</div>
				</div>

				<!-- ADD TO CART -->
				<button
					on:click={addToCart({ variant: selectedVariant })}
					class="hover:bg-primary hover:text-dark hover:border-primary mb-10 flex w-full items-center justify-center border p-4 text-white opacity-90 transition-all duration-300 hover:font-bold"
				>
					<span class="text-sm uppercase">Add To Cart</span>
				</button>

				<!-- {#if shippingDetails}
					<DescriptionToggle title="Shipping Details" description={shippingDetails} />
				{/if} -->
			</div>
		</div>
	{/if}
</section>
