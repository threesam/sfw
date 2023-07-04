<script lang="ts">
	import type { PageData } from './$types'
	import Image from '$lib/components/Image.svelte'
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

<section class="bg-dark bg-gradient-3 relative grid h-32 w-full place-content-center lg:h-64">
	<h1 class="text-bold font-display text-dark relative z-0 text-center text-3xl lg:text-5xl">
		All Projects
	</h1>
</section>

<div class="flex flex-col lg:hidden">
	{#each sortedProjects as project, index}
		<SideBySide {project} {index} path="/projects/" />
	{/each}
</div>

<div class="hidden grid-cols-2 lg:grid">
	{#each sortedProjects as { title, description, slug, status, image, posters }}
		<div
			style="--primary: {image.color}"
			class="text-light relative mx-auto mb-10 flex aspect-square h-full w-full flex-col items-start"
		>
			{#if slug}
				<a
					href={'/projects/' + slug}
					class={`absolute inset-0 grayscale transition-all duration-300 hover:opacity-5`}
				>
					<Image src={image.src ?? posters?.[0].url} alt={image.alt} caption={image.caption} />
				</a>

				<div
					class={`flex h-full w-full flex-col items-start justify-center px-5 pb-10 pt-5 lg:items-center`}
				>
					<div
						class="flex w-full max-w-lg flex-col justify-center lg:mx-auto lg:items-center lg:text-center"
					>
						<span class="mb-2 text-sm">{status.replace(/-/g, ' ')}</span>

						<h3 class="font-display sm:text-2xl lg:text-5xl">{title}</h3>

						<p class="pb-3 lg:py-3">{description}</p>

						<a
							class="hover:text-primary underline underline-offset-4 transition-all duration-300 hover:underline-offset-2"
							href={'/projects/' + slug}>learn more</a
						>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
