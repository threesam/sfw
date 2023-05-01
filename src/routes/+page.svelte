<script>
	export let data = {};

	const { projects } = data;

	const first = projects.shift();

	import Banner from '$lib/components/Banner.svelte';
	import SideBySide from '$lib/components/SideBySide.svelte';
</script>

<Banner {...first} path="/projects/" />
<div class="flex flex-col pt-10 last:mb-20">
	{#each projects as project, i}
		<SideBySide {...project} index={i} path="/projects/" />
	{/each}
</div>
