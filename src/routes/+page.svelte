<script>
	export let data = {};
	console.log('data', data);

	const { projects } = data;

	const first = projects.shift();

	import Banner from '$lib/components/Banner.svelte';
	import SideBySide from '$lib/components/SideBySide.svelte';
</script>

<Banner {...first} path="/projects/" />
<div class="max-w-5xl mx-auto">
	{#each projects.reverse() as project}
		<SideBySide {...project} path="/projects/" />
	{/each}
</div>
