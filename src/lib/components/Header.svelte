<script>
	import Pencil from './Pencil.svelte';
	
	export let links = [
		{
			title: 'about',
			href: '/about'
		},
		{
			title: 'contact',
			href: '/contact'
		}
	];

	let w = 0;
</script>

<svelte:window bind:innerWidth={w} />

<header class="fixed z-10 flex flex-col items-center w-full bg-black">
	<Pencil />
	<div class="w-full max-w-full h-16 flex items-center justify-between px-5 lg:px-10">
		<a href="/">
			{#if w > 768}
				<h3 class="text-light text-2xl">Skeleton Flowers & Water</h3>
			{:else}
				<h3 class="text-light text-xl">SF+W</h3>
			{/if}
		</a>
		{#each links as { href, title }}
			<a class="text-base lg:text-lg hover:text-primary transition duration-300 border-b-2 border-transparent hover:border-primary" {href}>{title}</a>
		{:else}
			<p>no links!</p>
		{/each}
	</div>
</header>
