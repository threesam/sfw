<script>
	export let links = [
		// {
		// 	title: 'projects',
		// 	href: '/projects'
		// },
		{
			title: 'contact',
			href: '/contact'
		}
	];
</script>

<nav>
	{#each links as { href, title }}
		<a {href}>{title}</a>
	{:else}
		<p>no links!</p>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	a {
		color: white;
		font-size: 1.5rem;
		align-items: center;
		text-decoration: none;
	}
	a:hover,
	a:active {
		color: goldenrod;
	}
</style>
