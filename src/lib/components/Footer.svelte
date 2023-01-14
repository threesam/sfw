<script>
	import SubscribeForm from './SubscribeForm.svelte';
	import SocialLinks from './SocialLinks.svelte';
</script>

<footer>
	<SocialLinks />
	<SubscribeForm />
</footer>

<style>
	footer {
		background-color: #f9c84c;
		margin-top: var(--headerHeight);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		padding: var(--containerPadding);
	}
	@media (max-width: 768px) {
		footer {
			flex-direction: column;
		}
	}
</style>
