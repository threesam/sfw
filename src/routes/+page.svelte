<script>
	export let data = {};

	const { projects } = data;

	const first = projects.shift();

	import Banner from '$lib/components/Banner.svelte';
	import SideBySide from '$lib/components/SideBySide.svelte';
</script>

<Banner {...first} path="/projects/" />
<div class="flex flex-col">
	{#each projects as project}
		<SideBySide {...project} path="/projects/" />
	{/each}
</div>
