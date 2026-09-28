<script lang="ts">
	import type { PageData } from './$types'
	import Image from '$lib/components/Image.svelte'
	import SideBySide from '$lib/components/SideBySide.svelte'
	import SEO from 'svelte-seo'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import { canonical } from '$lib/utils/site'
	import type { Project } from '$types'

	let { data }: { data: PageData } = $props()

	let sortedProjects = $derived.by(() => {
		const sorted: Project[] = []
		data.body.projects.forEach((project) => {
			if (project.status === 'pre-production') {
				sorted.push(project)
			} else {
				sorted.unshift(project)
			}
		})
		return sorted
	})

	let itemListLd = $derived({
		'@type': 'ItemList',
		name: 'Films by Skeleton Flowers and Water',
		itemListElement: sortedProjects
			.filter((p) => p.slug)
			.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				url: canonical(`/projects/${p.slug}`),
				name: p.title,
			})),
	})
</script>

<SEO
	title="Films - Skeleton Flowers and Water"
	description="The catalog: completed films, in production, and what's next from Skeleton Flowers and Water."
/>
<JsonLd data={itemListLd} />

<section class="bg-dark bg-gradient-3 relative grid h-32 w-full place-content-center lg:h-64">
	<h1 class="text-bold font-display text-dark relative z-0 text-center text-3xl lg:text-5xl">
		Films
	</h1>
</section>

<div class="flex flex-col lg:hidden">
	{#each sortedProjects as project, index (project)}
		<SideBySide {project} {index} path="/projects/" />
	{/each}
</div>

<div class="hidden grid-cols-2 lg:grid">
	{#each sortedProjects as project (project)}
		{@const { title, description, slug, status, image, posters } = project}
		<div
			style="--primary: {image.color}"
			class="text-light relative mx-auto mb-10 flex aspect-square h-full w-full flex-col items-start"
		>
			{#if slug}
				<!-- Not a link: the hover panel below sits on top of it, so it was never clickable,
				     only a nameless extra tab stop. "learn more" is the link. -->
				<div class="absolute inset-0 grayscale">
					<Image src={image.src ?? posters?.[0]?.url} alt={image.alt} caption={image.caption} />
				</div>

				<div
					class="z-0 flex h-full w-full flex-col items-start justify-center bg-black/80 px-5 pb-10 pt-5 opacity-0 transition-all duration-300 hover:opacity-100 lg:items-center"
				>
					<div
						class="flex w-full max-w-lg flex-col justify-center lg:mx-auto lg:items-center lg:text-center"
					>
					<span class="text-sm mb-2 text-gray-300 uppercase">{status.replace(/-/g, ' ')}</span>

						<h2 class="font-display sm:text-2xl lg:text-5xl">{title}</h2>

						<p class="pb-3 lg:py-3">{description}</p>

						<a
							class="hover:text-primary underline underline-offset-4 transition-all duration-300 hover:underline-offset-2"
							href={'/projects/' + slug}>learn more<span class="sr-only"> about {title}</span></a
						>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
