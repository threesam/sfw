<script>
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
</script>

<header class="fixed z-10 flex w-full flex-col items-center bg-black">
	<div class="flex h-16 w-full max-w-full items-center justify-between px-5 lg:px-10">
		<a class="relative" href="/">
			<h3 class="font-display text-light">
				<span class="hidden text-2xl lg:block">Skeleton Flowers & Water</span>
				<span class="block text-xl lg:hidden">SF+W</span>
			</h3>
		</a>
		<div class="flex gap-5">
			{#each links as { href, title }}
				<a
					class="hover:border-primary hover:text-primary border-b-2 border-transparent text-base transition duration-300 lg:text-lg"
					{href}>{title}</a
				>
			{:else}
				<p>no links!</p>
			{/each}
		</div>
	</div>
</header>
