<script lang="ts">
	import type { PageData } from './$types'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
	import JsonLd from '$lib/components/JsonLd.svelte'
	import { PortableText, type InputValue } from '@portabletext/svelte'
	import SEO from 'svelte-seo'
	import { page } from '$app/stores'
	import type { Project } from '$types'
	import { optimize } from '$lib/utils/img'

	const SITE = 'https://skeletonflowersandwater.com'

	let { data }: { data: PageData } = $props()

	let project = $derived(data.body.project)

	const getBackstage = (project: Project | null | undefined) =>
		project?.links?.find(({ title }) => title === 'backstage')

	let backstage = $derived(getBackstage(project))

	const STATUS_MAP: Record<string, string> = {
		completed: 'Completed',
		released: 'Released',
		'post-production': 'Post-Production',
		filming: 'Filming',
		'pre-production': 'Pre-Production',
	}

	let movieLd = $derived(
		project
			? {
					'@type': 'Movie',
					name: project.title,
					description: project.description,
					url: SITE + $page.url.pathname,
					image: optimize(project.image?.src, { w: 1200 }),
					productionCompany: {
						'@type': 'Organization',
						name: 'Skeleton Flowers and Water',
						url: SITE,
					},
					actor: (project.cast ?? []).map((c) => ({
						'@type': 'Person',
						name: c.name,
						sameAs: c.link ? [c.link] : undefined,
					})),
					...((project.crew ?? []).find((c) => /director/i.test(c.role))
						? {
								director: (project.crew ?? [])
									.filter((c) => /director/i.test(c.role))
									.map((c) => ({
										'@type': 'Person',
										name: c.name,
										sameAs: c.link ? [c.link] : undefined,
									})),
							}
						: {}),
					creativeWorkStatus: STATUS_MAP[project.status ?? ''] ?? project.status,
				}
			: null,
	)
</script>

{#if project}
	<SEO
		title={`${project.title} — Skeleton Flowers and Water`}
		description={project.description}
		openGraph={{
			title: project.title,
			description: project.description,
			url: SITE + $page.url.pathname,
			type: 'video.movie',
			images: project.image?.src ? [{ url: optimize(project.image.src, { w: 1200 }) ?? '' }] : [],
		}}
	/>

	{#if movieLd}
		<JsonLd data={movieLd} />
	{/if}

	<section
		style="--primary: {project.image.color}"
		class="bg-dark bg-gradient-3 relative grid h-32 w-full place-content-center lg:h-64"
	>
		<h1 class="text-bold font-display text-dark relative z-0 text-center text-3xl lg:text-5xl">
			{project.title}
		</h1>
	</section>

	<section class="text-xl">
		{#if project.status === 'pre-production' && backstage}
			<div
				class="text-light shadow-primary mx-auto my-32 max-w-xl border border-slate-700 p-10 shadow-md"
			>
				This project is in active development, see available roles on <a
					class="border-primary text-light border-b transition-all duration-300 hover:border-transparent"
					href={backstage.href}>backstage</a
				>
			</div>
		{/if}

		<div class="mx-auto max-w-2xl px-5 my-32" style={`--primary: ${project.image.color}`}>
			{#if project.body}
				<h3 class="font-thin text-center text-2xl sm:text-4xl mb-3 font-normal">abstract</h3>

				<div class="portable-text mb-32 text-center text-light font-extralight text-xl sm:text-2xl">
					<PortableText value={project.body as InputValue} />
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
					src={optimize(project.posters[0]?.src, { w: 900 })}
					alt={'poster for ' + project.title}
					loading="lazy"
					decoding="async"
					width="675"
					height="900"
				/>
			</figure>
		{/if}
	</section>
{/if}
