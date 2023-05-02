<script>
	import Pencil from './Pencil.svelte'

	export let links = [
		{
			title: 'about',
			href: '/about'
		},
		{
			title: 'contact',
			href: '/contact'
		}
	]

	let w = 0
</script>

<svelte:window bind:innerWidth={w} />

<header class="fixed z-10 flex w-full flex-col items-center bg-black">
	<Pencil />
	<div class="flex h-16 w-full max-w-full items-center justify-between px-5 lg:px-10">
		<a href="/">
			{#if w > 768}
				<h3 class="text-2xl text-light">Skeleton Flowers & Water</h3>
			{:else}
				<h3 class="text-xl text-light">SF+W</h3>
			{/if}
		</a>
		<div class="flex gap-5">
			{#each links as { href, title }}
				<a
					class="border-b-2 border-transparent text-base transition duration-300 hover:border-primary hover:text-primary lg:text-lg"
					{href}>{title}</a
				>
			{:else}
				<p>no links!</p>
			{/each}
		</div>
	</div>
</header>
