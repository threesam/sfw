<script lang="ts">
	import type { PageData } from './$types'
	import SideBySide from '$lib/components/SideBySide.svelte'
	import SEO from 'svelte-seo'

	export let data: PageData

	const { projects } = data.body

	let sortedProjects = []
	projects.forEach((project) => {
		if (project.status === 'pre-production') {
			sortedProjects.push(project)
		} else {
			sortedProjects.unshift(project)
		}
	})
</script>

<SEO title="Projects" />

<section class="bg-dark bg-gradient-3 relative grid h-64 w-full place-content-center">
	<h1 class="text-bold font-display text-dark relative z-0 text-center text-3xl lg:text-5xl">
		All Projects
	</h1>
</section>
<!-- <h1 class="font-display bg-primary w-full px-5 pb-0 pt-10 lg:text-center">All Projects</h1> -->
<div class="flex flex-col">
	{#each sortedProjects as project, index}
		<SideBySide {project} {index} path="/projects/" />
	{/each}
</div>
