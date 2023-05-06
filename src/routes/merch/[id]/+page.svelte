<script lang="ts">
	import SEO from '$components/SEO.svelte'
	import DescriptionToggle from '$components/DescriptionToggle.svelte'
	import { fade } from 'svelte/transition'
	import { showCart } from '$store'
	import { trackCart } from '$utils/umami'
	import type { PageData } from './$types'

	export let data: PageData

	const { product } = data.body
	console.log('product: ', product)

	let selectedOptions = {}
	let cartLoading = false

	// product?.options.forEach((option) => {
	// 	selectedOptions = { ...selectedOptions, [option.name]: option.values[0] }
	// })

	async function addToCart() {
		cartLoading = true
		let variant
		let cartId

		if (typeof window !== 'undefined') {
			cartId = JSON.parse(localStorage.getItem('cartId'))
		}

		data.product.variants.edges.forEach((v) => {
			let result = v.node.selectedOptions.every((option) => {
				return selectedOptions[option.name] === option.value
			})
			if (result) {
				variant = v
			}
		})

		await fetch('/cart.json', {
			method: 'PATCH',
			body: JSON.stringify({ cartId, variantId: variant.node.id })
		})
		// Wait for the API to finish before updating cart items
		await getCartItems()

		cartLoading = false
		$showCart = true

		trackCart({
			product: data.product,
			variant,
			type: 'add-to-cart'
		})
	}
</script>

<!-- <SEO data={data.body} pageType="product" /> -->

<section class="p-5 lg:p-10">
	{#if product}
		<div class="flex flex-col md:flex-row">
			<!-- IMAGE GALLERY -->
			<!-- <ProductDetailsImageGallery {product} /> -->
			<img src={product.thumbnail_url} alt="" />

			<!-- DETAILS -->
			<div class="h-full px-6 md:w-1/3">
				<!-- TITLE -->
				<h1 class="font-display mb-3 pt-5 text-4xl">{product.name}</h1>

				<!-- PRICE -->
				<p class="mb-3 text-lg">
					<b>{product.retail_price}</b>
					{product.currency}
				</p>

				<!-- DESCRIPTION -->
				<p class="mb-3">{product.description}</p>

				<!-- PRODUCT OPTIONS -->
				<!-- {#each product.options.filter((option) => option.name.toLowerCase() === 'size') as option}
					<div class="mb-8 pt-5">
						<h4 class="mb-2 text-base font-semibold uppercase tracking-wide">{option.name}</h4>
						<div class="flex">
							{#each option.values as value}
								<button
									on:click={() => {
										selectedOptions = { ...selectedOptions, [option.name]: value }
									}}
									class={`${value.length <= 3 ? 'w-12' : 'px-2'} ${
										selectedOptions[option.name] === value ? 'opacity-100' : 'opacity-60'
									} mr-3 flex h-12 items-center justify-center border-2 border-black transition duration-300 ease-in-out hover:scale-95 hover:opacity-100`}
								>
									{value}
								</button>
							{/each}
						</div>
					</div>
				{/each} -->

				<!-- ADD TO CART -->
				<button
					on:click={addToCart}
					class="bg-dark mt-6 flex w-full items-center justify-center p-4 text-sm uppercase tracking-wide text-white opacity-90 hover:opacity-100"
				>
					{#if !cartLoading}
						<span>Add To Cart</span>
					{:else}
						<div in:fade class="lds-ring ml-4 text-white">
							<div />
							<div />
							<div />
							<div />
						</div>
					{/if}
				</button>

				<!-- {#if shippingDetails}
					<DescriptionToggle title="Shipping Details" description={shippingDetails} />
				{/if} -->
			</div>
		</div>
	{/if}
</section>
