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
	];
</script>

<nav class="flex justify-between item-center gap-5">
	{#each links as { href, title }}
		<a class="text-base lg:text-lg hover:text-primary transition duration-300 border-b-2 border-transparent hover:border-primary" {href}>{title}</a>
	{:else}
		<p>no links!</p>
	{/each}
</nav>
