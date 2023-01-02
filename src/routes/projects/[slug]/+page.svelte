<script>
	export let data;
	const project = data.data;

	import Banner from '$lib/components/Banner.svelte';
</script>

<Banner {...project} />
