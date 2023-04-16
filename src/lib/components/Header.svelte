<script>
	import Pencil from './Pencil.svelte';
	import Nav from './Nav.svelte';

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
		<Nav />
	</div>
</header>
