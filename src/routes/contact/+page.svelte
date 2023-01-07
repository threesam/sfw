<script>
	import SubscribeForm from '$lib/components/SubscribeForm.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
</script>

<section>
	<h2>Subscribe</h2>
	<SubscribeForm />
	<h2>Follow</h2>
	<SocialLinks />
</section>

<style>
	section {
		background-color: #f9c84c;
		height: calc(100vh - 3rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
	}

	h2 {
		margin: 0;
		color: var(--background);
	}
</style>
