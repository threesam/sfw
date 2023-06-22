<script lang="ts">
	import { page } from '$app/stores'
	import HeaderMenu from '$components/HeaderMenu.svelte'
	import Icons from '$components/Icons.svelte'
	import { cartQuantity, showCart, showMenu } from '$store'

	export let links = [
		{
			title: 'projects',
			href: '/projects'
		},
		{
			title: 'about',
			href: '/about'
		},
		{
			title: 'contact',
			href: '/contact'
		}
	]

	$: currentRoute = $page.url.pathname

	$: onChange(currentRoute)

	function onChange(...args: any[]) {
		$showMenu = false
	}

	function openCart() {
		$showMenu = false
		$showCart = true
	}
</script>

<header class="fixed z-10 flex w-full flex-col items-center bg-dark">
	<div class="flex h-16 w-full items-center justify-between px-5 lg:px-10">
		<a class="relative z-10" href="/">
			<h3
				class="bg-gradient-to-r from-slate-200 via-primary to-slate-200 bg-clip-text font-display text-transparent transition-all duration-500 hover:from-red-500 hover:via-slate-200 hover:to-red-500"
			>
				<span class="hidden text-2xl lg:block">Skeleton Flowers & Water</span>
				<span class="block text-xl lg:hidden">SF+W</span>
			</h3>
		</a>
		<div class="absolute inset-0 hidden items-center justify-center gap-5 lg:flex">
			{#each links as { href, title }}
				<a
					class="border-b-2 border-transparent text-base transition duration-300 hover:border-primary hover:text-primary lg:text-lg"
					{href}>{title}</a
				>
			{:else}
				<p>no links!</p>
			{/each}
		</div>
		<div class="z-10 flex gap-4">
			<button on:click={openCart} class="relative my-2">
				<Icons strokeColor={Number($cartQuantity) > 0 ? '#777' : '#fff'} type="cart" />
				{#if Number($cartQuantity) > 0}
					<div
						data-test="cart-quantity"
						class="absolute bottom-0 left-0 -mb-3 -ml-3 flex h-5 w-5 items-center justify-center border-2 border-dark bg-white text-xs font-bold text-dark"
					>
						{$cartQuantity}
					</div>
				{/if}
			</button>
			<!-- MOBILE MENU TOGGLE -->
			{#if !$showMenu}
				<button
					on:click={() => {
						$showMenu = true
					}}
					aria-label="Open menu"
					class="lg:hidden"
				>
					<Icons strokeColor="#fff" type="menu" />
				</button>
			{:else}
				<button
					aria-label="Close menu"
					class="lg:hidden"
					on:click={() => {
						$showMenu = false
					}}
				>
					<Icons strokeColor="#fff" type="close" />
				</button>
			{/if}
		</div>
	</div>

	<!-- MOBILE MENU -->
	{#if $showMenu}
		<HeaderMenu {links} />
	{/if}
</header>
