<script>
	export let data = {};

	const { projects } = data;

	const first = projects[0];

	import Banner from '$lib/components/Banner.svelte';
	import SideBySide from '$lib/components/SideBySide.svelte';
</script>

<Banner {...first} path="/projects/" />
{#each projects.reverse() as project}
	<SideBySide {...project} path="/projects/">
		<h3 style={project.imagePalette && `color: ${project.imagePalette.lightVibrant.background}`}>
			{project.title}
		</h3>
		<p>{project.description}</p>

		<a sveltekit:prefetch href={'/projects/' + project.slug}>learn more</a>
	</SideBySide>
{/each}
