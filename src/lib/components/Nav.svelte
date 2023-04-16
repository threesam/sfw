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
		<a class="text-lg" {href}>{title}</a>
	{:else}
		<p>no links!</p>
	{/each}
</nav>
