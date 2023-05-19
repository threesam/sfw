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

<header class="bg-dark fixed z-10 flex w-full flex-col items-center">
	<div class="flex h-16 w-full items-center justify-between px-5 lg:px-10">
		<a class="pointer-events-none relative z-10" href="/">
			<h3
				class="font-display via-primary bg-gradient-to-r from-slate-200 to-slate-200 bg-clip-text text-transparent transition-all duration-500 hover:from-red-500 hover:via-slate-200 hover:to-red-500"
			>
				<span class="hidden text-2xl lg:block">Skeleton Flowers & Water</span>
				<span class="block text-xl lg:hidden">SF+W</span>
			</h3>
		</a>
	</div>
</header>
