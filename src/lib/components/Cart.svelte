<script>
	export let loading = false

	import Icons from './Icons.svelte'
	import { showCart, cartItems } from '$store'
	import { fly, fade } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	// import { trackCart } from '$lib/utils/umami'

	let clientWidth

	async function addOneItem(item) {
		$cartItems = $cartItems.map((variant) => {
			if (variant.id === item.id) {
				variant.quantity++
			}
			return variant
		})
	}
	function removeOneItem(item) {
		$cartItems = $cartItems
			.map((variant) => {
				if (variant.id === item.id) {
					if (variant.quantity === 1) {
						removeEntireItem(variant)
						return
					} else {
						variant.quantity--
					}
				}
				return variant
			})
			.filter((variant) => variant)

		if ($cartItems.length === 0) {
			$showCart = false
		}
	}

	function removeEntireItem(item) {
		$cartItems = $cartItems.filter((variant) => variant.id !== item.id)

		if ($cartItems.length === 0) {
			$showCart = false
		}
	}

	$: checkoutText = 'checkout'
	async function checkout() {
		// const checkoutUrl = localStorage.getItem('cartUrl')
		// window.open(JSON.parse(checkoutUrl ?? ''), '_blank')
		checkoutText = '🖕coming soon🖕'
		setTimeout(() => {
			checkoutText = 'checkout'
		}, 3000)
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
						alt={item.name}
						decoding="async"
						loading="lazy"
						class="h-24 w-24 flex-none bg-gradient-to-tr from-slate-100 to-gray-700"
						src={item.product.thumbnail_url}
					/>
					<div class="ml-4 flex w-full flex-col justify-between">
						<div class="flex w-full justify-between">
							<div>
								<p class="text-lg font-medium">{item.name.split(' - ')[0]}</p>
								<p class="text-sm">{item.name.split(' - ')[1]}</p>
							</div>
							<p class="font-medium">{item.retail_price} {item.currency}</p>
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
							class="text-light font-bold underline underline-offset-4 duration-300 hover:text-red-500 hover:underline-offset-2"
							>remove</span
						>
					</button>
					<div class="flex h-8 w-full">
						<button
							on:click={() => {
								removeOneItem(item)
							}}
							class="ml-auto flex h-8 w-8 items-center justify-center transition-all duration-300 hover:scale-125"
						>
							<Icons type="minus" strokeColor="#eee" />
						</button>
						<div class="flex h-full items-center px-2">
							{item.quantity}
						</div>
						<button
							on:click={() => {
								addOneItem(item)
							}}
							class="flex h-8 w-8 items-center justify-center transition-all duration-300 hover:scale-125"
						>
							<Icons type="plus" strokeColor="#eee" />
						</button>
					</div>
				</div>
			{/each}
		</div>

		<!-- CHECKOUT BUTTON -->
		{#if $cartItems.length !== 0}
			<div class="p-5">
				<div class="text-ligh flex w-full justify-between pb-3">
					<b>Subtotal</b>
					<span
						>{$cartItems.reduce((acc, curr) => {
							acc += Number(curr.retail_price) * curr.quantity
							return acc
						}, 0) +
							'.00 ' +
							$cartItems[0]?.currency}</span
					>
				</div>
				<button
					on:click={checkout}
					class="hover:bg-light hover:text-dark flex w-full items-center justify-center border p-4 text-white opacity-90 transition-all duration-300 hover:font-bold"
				>
					<span class="text-lg uppercase">{checkoutText}</span>
				</button>
			</div>
		{/if}
	</div>
</div>
