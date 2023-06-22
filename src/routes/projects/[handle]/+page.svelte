<script lang="ts">
	import type { PageData } from './$types'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
	import { PortableText } from '@portabletext/svelte'
	import SEO from 'svelte-seo'

	export let data: PageData

	const { project } = data.body

	const backstageLink = project.links.find(({ title }) => title === 'backstage')
</script>

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
	class="relative mb-5 grid h-64 w-full place-content-center bg-dark bg-gradient-3"
>
	<h1 class="text-bold relative z-0 text-center font-display text-3xl text-dark lg:text-5xl">
		{project.title}
	</h1>
</section>

<section class="p-5">
	{#if project.status === 'pre-production' && backstageLink}
		<div
			class="mx-auto mb-10 max-w-xl border border-slate-700 p-10 text-light shadow-md shadow-primary"
		>
			This project is in active development, see available roles on <a
				class="border-b border-primary text-primary transition-all duration-300 hover:underline-offset-2"
				href={backstageLink.href}>backstage</a
			>
		</div>
	{/if}

	<div class="mx-auto max-w-2xl pb-10" style={`--primary: ${project.image.color}`}>
		{#if project.body}
			<h3 class="text-center font-display text-2xl font-normal">abstract</h3>
			<div class="portable-text mb-10 text-center font-extralight">
				<PortableText value={project.body} />
			</div>
		{/if}

		{#if project.cast}
			<h4 class="text-center font-display text-2xl">cast</h4>
			<ul class="mb-10">
				{#each project.cast as castMember}
					<li class="grid grid-cols-2 gap-2 text-left">
						<span class="text-right">{castMember.castname}</span>
						{#if castMember.name && castMember.link}
							<a
								class="h-max w-max border-b border-primary transition-all duration-300 hover:border-transparent hover:tracking-wider hover:text-primary"
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
			<h4 class="text-center font-display text-2xl">crew</h4>
			<ul>
				{#each project.crew as crewMember}
					<li class="grid grid-cols-2 gap-2 text-left">
						<span class="text-right">{crewMember.role}</span>
						{#if crewMember.name && crewMember.link}
							<a
								class="h-max w-max border-b border-primary transition-all duration-300 hover:border-transparent hover:tracking-wider hover:text-primary"
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
		<div class="mx-auto w-max pb-20 pt-10">
			<SocialLinks size={40} links={project.links} color={project.image.color} />
		</div>
	{/if}

	{#if project.posters}
		<figure class="w-max-content flex aspect-[3/4] w-full justify-center pb-20 lg:max-h-[50vh]">
			<img
				class="aspect-[3/4] lg:max-h-[50vh]"
				src={project.posters[0].src}
				alt={'poster for ' + project.title}
			/>
		</figure>
	{/if}
</section>
