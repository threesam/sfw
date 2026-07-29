<script lang="ts">
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import Banner from '$lib/components/Banner.svelte'
	import Swiper from '$components/Swiper.svelte'
	import SubscribeForm from '$lib/components/SubscribeForm.svelte'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
	import ProductTile from '$lib/components/ProductTile.svelte'

	let { data }: { data: PageData } = $props()

	const { projects, products } = data.body
	let settings = $derived(($page.data as { body?: { settings?: { links?: { title: string; href: string }[] } } }).body?.settings ?? null)

	const featuredProject = projects.find(({ isFeatured }) => isFeatured) ?? projects[0]
	const visibleProjects = projects.filter(({ status }) => status !== 'pre-production')
</script>

<Banner {...featuredProject} path="/projects/" />

<Swiper title="Films" slides={visibleProjects} />

<section class="mx-auto max-w-6xl px-5 py-16 lg:px-10">
	<div class="flex items-baseline justify-between pb-6">
		<h2 class="font-display text-4xl">Shop</h2>
		<a href="/merch" class="text-sm uppercase underline underline-offset-4">all</a>
	</div>
	<div class="grid gap-10 lg:grid-cols-3 lg:gap-6">
		{#each products
			.sort((a, b) => Number(b.variants[0]?.retail_price ?? 0) - Number(a.variants[0]?.retail_price ?? 0))
			.slice(0, 3) as product}
			<ProductTile
				id={product.id}
				name={product.name}
				thumbnail_url={product.thumbnail_url}
				price={product.variants[0]?.retail_price}
				currency={product.variants[0]?.currency}
			/>
		{/each}
	</div>
</section>

<section class="bg-gradient-3 px-5 py-20 text-center lg:px-10">
	<h2 class="font-display text-dark mb-2 text-3xl lg:text-4xl">Stay close.</h2>
	<p class="text-dark mx-auto mb-8 max-w-md text-sm opacity-80">
		Release dates, behind-the-scenes, and the occasional dispatch.
	</p>
	<div class="mx-auto max-w-md">
		<SubscribeForm darkMode location="home" />
	</div>
	{#if settings?.links?.length}
		<div class="mt-12 flex justify-center">
			<SocialLinks links={settings.links} color="var(--dark)" size={40} location="home" />
		</div>
	{/if}
</section>
