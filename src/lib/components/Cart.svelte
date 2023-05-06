<script>
	export let loading = false

	import Icons from './Icons.svelte'
	import { showCart, cartItems } from '$store'
	import { fly, fade } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	// import { trackCart } from '$lib/utils/umami'

	let clientWidth

	async function addOneItem(item) {
		loading = true
		dispatch('addProduct', {
			body: item.node.merchandise.id
		})

		let variantId
		let cartId

		if (typeof window !== 'undefined') {
			cartId = JSON.parse(localStorage.getItem('cartId') ?? '')
		}

		// data.product.variants.edges.forEach((variant) => {
		// 	let result = variant.node.selectedOptions.every((option) => {
		// 		return selectedOptions[option.name] === option.value
		// 	})
		// 	if (result) {
		// 		variantId = variant.node.id
		// 	}
		// })

		await fetch('/cart.json', {
			method: 'PATCH',
			body: JSON.stringify({ cartId: cartId, variantId: variantId })
		})
		// Wait for the API to finish before updating cart items

		loading = false
	}
	function removeOneItem(item) {
		loading = true
		let quantity = item.node.quantity - 1
		dispatch('removeProduct', {
			body: {
				variantId: item.node.merchandise.id,
				quantity: quantity,
				lineId: item.node.id
			}
		})
		loading = false
	}

	function removeEntireItem(item) {
		loading = true

		loading = false

		// trackCart({
		// 	variant: item,
		// 	type: 'remove-from-cart'
		// })
	}

	async function checkout() {
		loading = true
		const checkoutUrl = localStorage.getItem('cartUrl')
		window.open(JSON.parse(checkoutUrl ?? ''), '_blank')
		loading = false
	}
</script>

<!-- CART -->
<div class="fixed inset-0 z-50 flex h-screen max-h-screen w-full justify-end overflow-hidden">
	<!-- OVERLAY -->
	<button
		transition:fade={{ duration: 700, easing: quintInOut }}
		class="fixed inset-0 z-10 w-full bg-black bg-opacity-70"
		on:click={() => ($showCart = false)}
	/>

	<div
		class="bg-dark z-50 flex h-full w-full flex-col justify-between gap-6 shadow-xl md:w-1/2 lg:w-1/3"
		bind:clientWidth
		transition:fly={{ x: clientWidth, opacity: 100, duration: 700, easing: quintInOut }}
	>
		{#if loading}
			<div class="absolute inset-0 z-50" />
		{/if}

		<!-- HEADER -->
		<div
			class="flex h-16 w-full items-center justify-between border-b-2 border-black bg-gray-700 px-6 py-5"
		>
			<div class="font-display text-xl font-medium">cart</div>
			<button
				on:click={() => ($showCart = false)}
				class="text-light text-sm uppercase opacity-80 hover:opacity-100">close</button
			>
		</div>

		<!-- EMPTY CART -->
		{#if $cartItems.length === 0}
			<div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden px-6">
				<button
					on:click={() => ($showCart = false)}
					class="flex h-16 w-16 items-center justify-center"
				>
					<Icons type="cart" strokeColor="#fff" />
				</button>
				<div class="mt-6 text-center text-2xl font-bold">Your cart is empty.</div>
			</div>
		{/if}

		<!-- CART ITEMS -->
		<div class="overflow-y-auto px-6" style="height: 80%;">
			{#each $cartItems as item, i (i)}
				<div class="mb-1 flex w-full">
					<img
						alt={item.node.merchandise.product.title}
						decoding="async"
						loading="lazy"
						class="h-24 w-24 flex-none border bg-gray-200"
						src={item.node.merchandise.product.images.edges[0].node.originalSrc +
							'&width=96&height=96'}
					/>
					<div class="ml-4 flex w-full flex-col justify-between">
						<div class="flex w-full justify-between">
							<di>
								<p class="text-lg font-medium">{item.node.merchandise.product.title}</p>
								<p class="text-sm">{item.node.merchandise.title}</p>
							</di>
							<p class="font-medium">${item.node.estimatedCost.totalAmount.amount}</p>
						</div>
					</div>
				</div>
				<div class="mb-6 flex w-full">
					<button
						on:click={() => removeEntireItem(item)}
						class="mr-2 flex items-center justify-center"
					>
						<!-- <Icons type="close" strokeColor="#000" /> -->
						<span
							class="text-dark font-bold underline underline-offset-4 duration-300 hover:text-red-500 hover:underline-offset-2"
							>remove</span
						>
					</button>
					<!-- <div class="flex h-8 w-full border border-white/40">
						<button
							on:click={() => {
								removeOneItem(item)
							}}
							class="ml-auto flex h-8 w-8 items-center justify-center hover:scale-125"
						>
							<Icons type="minus" strokeColor="#000" />
						</button>
						<div class="flex h-full items-center px-2">
							{item.node.quantity}
						</div>
						<button
							on:click={() => {
								addOneItem(item)
							}}
							class="flex h-8 w-8 items-center justify-center hover:scale-125"
						>
							<Icons type="plus" strokeColor="#000" />
						</button>
					</div> -->
				</div>
			{/each}
		</div>

		<!-- CHECKOUT BUTTON -->
		{#if $cartItems.length !== 0}
			<div class="overflow-hidden bg-slate-100 p-6">
				<button
					on:click={checkout}
					class="flex w-full items-center justify-center bg-black p-4 text-sm font-medium text-white opacity-90 hover:opacity-100"
				>
					{#if !loading}
						<span class="font-display h-8 text-xl">Checkout</span>
					{:else}
						<div class="lds-ring h-8 text-white">
							<div />
							<div />
							<div />
							<div />
						</div>
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 20px;
		height: 2rem;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 1.75rem;
		height: 1.75rem;
		margin: 2px;
		border: 2px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
