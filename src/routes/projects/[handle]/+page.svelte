<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import Image from '$lib/components/Image.svelte'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
	import { PortableText } from '@portabletext/svelte'

	export let data: PageData

	const { project } = data.body
	console.log('project: ', project)

	const backstageLink = project.links.find(({ title }) => title === 'backstage')
	console.log('backstageLink: ', backstageLink)
</script>

<Banner height="47vh" image={project.image} />
<section class="p-5">
	<h1 class="pb-10 pt-5 text-center text-3xl lg:text-5xl">{project.title}</h1>

	{#if project.status === 'pre-production' && backstageLink}
		<div
			class="shadow-primary text-light mx-auto mb-10 max-w-xl border border-slate-700 p-10 shadow-md"
		>
			This project is in active development, see available roles on <a
				class="text-primary underline underline-offset-4 transition-all duration-300 hover:underline-offset-2"
				href={backstageLink.href}>backstage</a
			>
		</div>
	{/if}

	<div class="mx-auto w-max pb-10">
		<SocialLinks size={40} links={project.links} color={project.image.color} />
	</div>

	<div class="mx-auto max-w-2xl pb-10" style={`--primary: ${project.image.color}`}>
		{#if project.body}
			<h3 class="text-center font-sans text-2xl font-normal">abstract</h3>
			<div class="portable-text mb-5 text-center font-extralight">
				<PortableText value={project.body} />
			</div>
		{/if}

		{#if project.cast}
			<h4 class="pt-3 text-center font-sans text-2xl">cast</h4>
			<ul class="mb-10">
				{#each project.cast as castMember}
					<li class="grid grid-cols-2 gap-2 text-left">
						<span class="text-right">{castMember.castname}</span>
						{#if castMember.name && castMember.link}
							<a class="underline underline-offset-4" href={castMember.link}>{castMember.name}</a>
						{:else}
							<span>{castMember.name}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}

		{#if project.crew}
			<h4 class="pt-3 text-center font-sans text-2xl">crew</h4>
			<ul>
				{#each project.crew as crewMember}
					<li class="grid grid-cols-2 gap-2 text-left">
						<span class="text-right">{crewMember.role}</span>
						{#if crewMember.name && crewMember.link}
							<a class="underline underline-offset-4" href={crewMember.link}>{crewMember.name}</a>
						{:else}
							<span>{crewMember.name}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	{#if project.posters}
		<figure class=" w-max-content flex w-full justify-center pb-10 lg:max-h-[50vh]">
			<img
				class="lg:max-h-[50vh]"
				src={project.posters[0].src}
				alt={'poster for ' + project.title}
			/>
		</figure>
	{/if}
</section>
