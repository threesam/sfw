<script lang="ts">
	import { page } from '$app/stores'
	import HeaderMenu from '$components/HeaderMenu.svelte'
	import Icons from '$components/Icons.svelte'
	import { cartQuantity, showCart, showMenu } from '$store'

	let {
		links = [
			{ title: 'films', href: '/projects' },
			{ title: 'about', href: '/about' },
			{ title: 'contact', href: '/contact' },
		],
	} = $props()

	let currentRoute = $derived($page.url.pathname)

	$effect(() => {
		// Close menu on route change
		currentRoute;
		$showMenu = false
	})

	function openCart() {
		$showMenu = false
		$showCart = true
	}
</script>

<header class="bg-dark fixed z-10 flex w-full flex-col items-center">
	<div class="flex h-16 w-full items-center justify-between px-5 lg:px-10">
		<div class="relative z-10 hidden gap-5 lg:flex">
			{#each links as { href, title } (href)}
				<a
					class="border-b-2 border-transparent text-base transition duration-300 hover:border-slate-500 lg:text-lg"
					{href}>{title}</a
				>
			{:else}
				<p>no links!</p>
			{/each}
		</div>
		<a class="relative inset-0 flex items-center justify-center gap-5 lg:absolute" href="/">
			<span
				class="block via-primary font-display hover:from-primary hover:to-primary bg-gradient-to-r from-slate-200 to-slate-200 bg-clip-text text-transparent transition-all duration-500 hover:via-slate-200"
			>
				<span class="hidden text-2xl lg:block">Skeleton Flowers & Water</span>
				<span class="block text-xl lg:hidden">SF+W</span>
			</span>
		</a>
		<div class="z-10 flex gap-4">
			<button
				onclick={openCart}
				aria-label={$cartQuantity > 0 ? `cart, ${$cartQuantity} items` : 'cart'}
				class="relative -m-2 p-2"
			>
				<Icons strokeColor={$cartQuantity > 0 ? '#777' : '#fff'} type="cart" />
				{#if $cartQuantity > 0}
					<div
						data-test="cart-quantity"
						aria-hidden="true"
						class="border-dark text-dark absolute bottom-2 left-2 -mb-3 -ml-3 flex h-5 w-5 items-center justify-center border-2 bg-white text-xs font-bold"
					>
						{$cartQuantity}
					</div>
				{/if}
			</button>
			<!-- MOBILE MENU TOGGLE: one button so focus survives the toggle -->
			<button
				onclick={() => ($showMenu = !$showMenu)}
				aria-label={$showMenu ? 'Close menu' : 'Open menu'}
				aria-expanded={$showMenu}
				aria-controls="mobile-menu"
				class="lg:hidden"
			>
				<Icons strokeColor="#fff" type={$showMenu ? 'close' : 'menu'} />
			</button>
		</div>
	</div>

	<!-- MOBILE MENU -->
	{#if $showMenu}
		<HeaderMenu {links} />
	{/if}
</header>
