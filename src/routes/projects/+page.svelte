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

<h1 class="w-full px-5 pb-0 pt-10 font-display lg:text-center">All Projects</h1>
<div class="flex flex-col pt-10 last:mb-20">
	{#each sortedProjects as project, index}
		<SideBySide {project} {index} path="/projects/" />
	{/each}
</div>
