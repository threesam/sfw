<script lang="ts">
	import Icons from './Icons.svelte'
	import { showCart, cartItems, cartQuantity, type CartItem } from '$store'
	import { fly, fade } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	import { trackCart, track } from '$lib/utils/umami'
	import { page } from '$app/stores'
	import { optimize } from '$lib/utils/img'

	let clientWidth = $state(0)

	// Native modal <dialog>: showModal() gives the focus trap, Escape-to-close and
	// inert page behind it for free. Focus goes back to whatever opened the cart.
	function modal(dialog: HTMLDialogElement) {
		const opener = document.activeElement as HTMLElement | null
		dialog.showModal()
		return () => opener?.focus()
	}

	function closeCart() {
		$showCart = false
	}

	function addOneItem(item: CartItem) {
		$cartItems = $cartItems.map((variant) => {
			if (variant.id === item.id) {
				variant.quantity++
			}
			return variant
		})

		trackCart({ variant: item, type: 'add-to-cart' })
	}

	function removeOneItem(item: CartItem) {
		if (item.quantity <= 1) return removeEntireItem(item)

		$cartItems = $cartItems.map((variant) => {
			if (variant.id === item.id) variant.quantity--
			return variant
		})

		trackCart({ variant: item, type: 'remove-from-cart' })
	}

	function removeEntireItem(item: CartItem) {
		$cartItems = $cartItems.filter((variant) => variant.id !== item.id)

		if ($cartItems.length === 0) {
			closeCart()
		}

		trackCart({ variant: item, type: 'remove-from-cart' })
	}

	let subtotal = $derived(
		$cartItems.reduce((acc, curr) => acc + Number(curr.retail_price) * curr.quantity, 0),
	)

	let checkoutText = $state('checkout')
	async function handleCheckout() {
		checkoutText = 'redirecting…'
		track('begin-checkout', { items: $cartQuantity, value: subtotal })
		try {
			const res = await fetch('/checkout/payment-intent', {
				method: 'POST',
				body: JSON.stringify({ items: $cartItems, pathname: $page.url.pathname }),
			})
			if (!res.ok) throw new Error('payment-intent ' + res.status)
			const url = await res.text()
			if (!url) throw new Error('empty checkout url')
			// This fires only once payment-intent creation actually succeeded — unlike
			// a "purchase" event on the success page (no session id to verify against,
			// see checkout/success), the browser really is leaving for Stripe here.
			track('checkout-redirect', { value: subtotal })
			// External URL — goto() in SvelteKit 2 only handles internal routes.
			window.location.href = url
		} catch (err) {
			console.error(err)
			checkoutText = 'try again'
			track('checkout-failed')
		}
	}
</script>

<!-- CART -->
<dialog
	{@attach modal}
	aria-labelledby="cart-title"
	onclose={closeCart}
	class="text-light m-0 flex h-full max-h-none w-full max-w-none justify-end overflow-hidden bg-transparent p-0 backdrop:bg-transparent"
>
	<!-- OVERLAY: mouse convenience; keyboard users have Escape and the close button -->
	<button
		aria-label="close cart"
		tabindex="-1"
		transition:fade={{ duration: 700, easing: quintInOut }}
		class="bg-dark/70 fixed inset-0 z-10 w-full"
		onclick={closeCart}
	></button>

	<div
		class="bg-dark z-50 flex h-full w-full flex-col justify-between gap-6 shadow-xl md:w-1/2 lg:w-1/3"
		bind:clientWidth
		transition:fly={{ x: clientWidth, opacity: 100, duration: 700, easing: quintInOut }}
	>
		<!-- HEADER -->
		<div
			class="border-dark bg-gradient-3 flex h-16 w-full items-center justify-between border-b-2 px-6 py-5"
		>
			<h2 id="cart-title" class="font-display text-dark text-xl font-medium">cart</h2>
			<button
				onclick={closeCart}
				class="text-md font-medium lowercase text-black opacity-80 hover:opacity-100">close</button
			>
		</div>

		<!-- EMPTY CART -->
		{#if $cartItems.length === 0}
			<div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden px-6">
				<button
					onclick={closeCart}
					aria-label="close empty cart"
					class="flex h-16 w-16 items-center justify-center"
				>
					<Icons type="cart" strokeColor="#fff" />
				</button>
				<p class="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
			</div>
		{/if}

		<!-- CART ITEMS -->
		<ul class="overflow-y-auto px-6" style="height: 80%;">
			{#each $cartItems as item (item.id)}
				<li>
					<div class="mb-1 flex w-full">
						<img
							alt=""
							decoding="async"
							loading="lazy"
							class="h-24 w-24 flex-none bg-gradient-to-tr from-slate-700"
							src={optimize(item.product.thumbnail_url, { w: 256 })}
						/>
						<div class="ml-4 flex w-full flex-col justify-between">
							<div class="flex w-full justify-between">
								<div>
									<p class="font-display text-xl font-medium">{item.name.split(' - ')[0]}</p>
									<p class="text-sm">{item.name.split(' - ')[1] ?? ''}</p>
								</div>
								<p class="font-medium">{item.retail_price} {item.currency}</p>
							</div>
						</div>
					</div>
					<div class="mb-6 flex w-full">
						<button
							onclick={() => removeEntireItem(item)}
							aria-label="remove {item.name}"
							class="mr-2 flex items-center justify-center"
						>
							<span
								class="text-light font-bold underline underline-offset-4 duration-300 hover:text-red-500 hover:underline-offset-2"
								>remove</span
							>
						</button>
						<div class="flex h-8 w-full">
							<button
								onclick={() => removeOneItem(item)}
								aria-label="remove one {item.name}"
								class="ml-auto flex h-8 w-8 items-center justify-center transition-all duration-300 hover:scale-125"
							>
								<Icons type="minus" strokeColor="#eee" />
							</button>
							<div class="flex h-full items-center px-2">
								<span class="sr-only">quantity</span>
								{item.quantity}
							</div>
							<button
								onclick={() => addOneItem(item)}
								aria-label="add one {item.name}"
								class="flex h-8 w-8 items-center justify-center transition-all duration-300 hover:scale-125"
							>
								<Icons type="plus" strokeColor="#eee" />
							</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<!-- CHECKOUT BUTTON -->
		{#if $cartItems.length !== 0}
			<div class="p-5">
				<div class="text-light flex w-full justify-between pb-3">
					<b>Subtotal</b>
					<span>{subtotal.toFixed(2) + ' ' + ($cartItems[0]?.currency ?? '')}</span>
				</div>
				<button
					onclick={handleCheckout}
					class="font-display hover:border-primary hover:bg-primary hover:text-dark flex w-full items-center justify-center border p-4 text-lg text-white opacity-90 transition-all duration-300 hover:font-bold"
				>
					<span class="text-lg uppercase" aria-live="polite">{checkoutText}</span>
				</button>
			</div>
		{/if}
	</div>
</dialog>
