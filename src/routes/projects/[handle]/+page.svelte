<script lang="ts">
	import type { PageData } from './$types'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
	import { PortableText } from '@portabletext/svelte'
	import SEO from 'svelte-seo'

	export let data: PageData

	$: ({ project } = data.body)

	const getBackstage = (project) => project?.links.find(({ title }) => title === 'backstage')
</script>

{#if project}
	<SEO
		title={project.title}
		description={project.description}
		openGraph={{
			title: project.title,
			description: project.description,
			images: [{ url: project?.image?.src ?? '' }]
		}}
	/>

	<section
		style="--primary: {project.image.color}"
		class="bg-dark bg-gradient-3 relative grid h-32 w-full place-content-center lg:h-64"
	>
		<h1 class="text-bold font-display text-dark relative z-0 text-center text-3xl lg:text-5xl">
			{project.title}
		</h1>
	</section>

	<section class="text-xl">
		{#if project.status === 'pre-production' && getBackstage(project)}
			<div
				class="text-light shadow-primary mx-auto my-32 max-w-xl border border-slate-700 p-10 shadow-md"
			>
				This project is in active development, see available roles on <a
					class="border-primary text-light border-b transition-all duration-300 hover:border-transparent"
					href={getBackstage(project).href}>backstage</a
				>
			</div>
		{/if}

		<div class="mx-auto max-w-2xl px-5 my-32" style={`--primary: ${project.image.color}`}>
			{#if project.body}
				<h3 class="font-thin text-center text-2xl sm:text-4xl mb-3 font-normal">abstract</h3>

				<div class="portable-text mb-32 text-center text-light font-extralight text-xl sm:text-2xl">
					<PortableText value={project.body} />
				</div>
			{/if}

			{#if project.cast}
				<h4 class="font-thin mb-3 text-center text-2xl sm:text-4xl">cast</h4>

				<ul class="mb-32">
					{#each project.cast as castMember}
						<li class="grid grid-cols-2 gap-3 items-center text-left mb-2">
							<span class="text-right text-gray-300 text-base">{castMember.castname}</span>

							{#if castMember.name && castMember.link}
								<a
									class="border-primary hover:text-primary h-max w-max border-b transition-all duration-300 hover:border-transparent hover:tracking-wider"
									href={castMember.link}>{castMember.name}</a
								>
							{:else}
								<span>{castMember.name}</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}

			{#if project.crew}
				<h4 class="font-thin mb-3 text-center text-2xl sm:text-4xl">crew</h4>

				<ul>
					{#each project.crew as crewMember}
					<li class="grid grid-cols-2 gap-3 items-center text-left mb-2">
						<span class="text-right text-gray-300 text-base">{crewMember.role}</span>

							{#if crewMember.name && crewMember.link}
								<a
									class="border-primary hover:text-primary h-max w-max border-b transition-all duration-300 hover:border-transparent hover:tracking-wider"
									href={crewMember.link}>{crewMember.name}</a
								>
							{:else}
								<span>{crewMember.name}</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if project.links?.length}
			<div class="flex w-full items-center justify-center mb-32">
				<SocialLinks size={40} links={project.links} color={project.image.color} />
			</div>
		{/if}

		{#if project.posters}
			<figure class="flex aspect-[3/4] w-full justify-center px-5 mb-32 lg:max-h-[50vh]">
				<img
					class="aspect-[3/4] lg:max-h-[50vh]"
					src={project.posters[0].src}
					alt={'poster for ' + project.title}
				/>
			</figure>
		{/if}
	</section>
{/if}
