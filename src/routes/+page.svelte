<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import Swiper from '$components/Swiper.svelte'

	export let data: PageData

	const { projects, products } = data.body

	const featuredProject = projects.find(({ isFeatured }) => isFeatured) ?? projects[0]
</script>

<Banner {...featuredProject} path="/projects/" />

<section class="grid h-96 w-full place-content-center bg-gradient-to-tl from-gray-700 to-gray-900">
	<div class="flex max-w-3xl flex-col items-center gap-5 p-5 lg:grid lg:grid-cols-2">
		<h2
			class="shadow-primary font-display text-light bg-dark flex h-full w-full items-center justify-center border border-slate-700 p-5 text-5xl font-thin shadow-md"
		>
			our mission
		</h2>
		<p class="text-center lg:text-left">
			Magna eiusmod qui in voluptate eu proident dolor magna officia esse nostrud do. Id cupidatat
			amet eiusmod ad. Minim do nisi fugiat labore sit cillum cupidatat anim esse excepteur sint.
		</p>
	</div>
</section>

<Swiper
	title="Featured Projects"
	slides={projects.slice(1).filter(({ status }) => status !== 'pre-production')}
/>

<h4 class="font-display p-5 text-4xl lg:px-10">Merch</h4>
<div class="bg-dark mb-10 grid gap-10 lg:grid-cols-3 lg:gap-2 lg:px-10">
	{#each products as product, i}
		<a href="/merch/{product.id}" class={`${i % 2 === 0 ? 'pl-5' : 'pr-5'} lg:p-0`}>
			<img
				class="mb-2 max-w-full bg-gradient-to-tr from-slate-100"
				src={product.thumbnail_url}
				alt={product.name}
			/>
			<div class={`${i % 2 === 0 ? '' : 'pl-5'} lg:p-0`}>
				<h4>{product.name}</h4>
				<p>{product.variants[0].retail_price} - <span>{product.variants[0].currency}</span></p>
			</div>
		</a>
	{/each}
</div>

<Swiper
	title="In Development"
	slides={projects.slice(1).filter(({ status }) => status === 'pre-production')}
/>
