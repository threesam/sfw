<script>
	import SubscribeForm from './SubscribeForm.svelte';
	import SocialLinks from './SocialLinks.svelte';
</script>

<footer>
	<section>
		<SocialLinks />
		<SubscribeForm />
	</section>
</footer>

<style>
	footer {
		background-color: #f9c84c;
		height: 8rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	section {
		width: 100%;
		max-width: 100rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 4rem;
		padding: 0 2rem;
	}
</style>
