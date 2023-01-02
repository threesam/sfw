<script>
	export let data = {};

	const { data: projects } = data;

	const first = projects[0];

	import Banner from '$lib/components/Banner.svelte';
	import SubscribeForm from '$lib/components/SubscribeForm.svelte';
	import SideBySide from '$lib/components/SideBySide.svelte';
</script>

<Banner {...first} path="/projects/" />
<SubscribeForm />
{#each projects.reverse() as project}
	<SideBySide {...project} path="/projects/" />
{/each}
