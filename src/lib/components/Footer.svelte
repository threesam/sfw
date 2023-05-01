<script>
	import SubscribeForm from './SubscribeForm.svelte';
	import SocialLinks from './SocialLinks.svelte';

	export let data;

	const {settings} = data.body
</script>

<footer>
	<SocialLinks links={settings.links} size={69} />
	<SubscribeForm />
</footer>

<style>
	footer {
		background-color: #f9c84c;
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
