<script lang="ts">
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import Banner from '$lib/components/Banner.svelte'
	import Swiper from '$components/Swiper.svelte'
	import SubscribeForm from '$lib/components/SubscribeForm.svelte'
	import SocialLinks from '$lib/components/SocialLinks.svelte'

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
			<a
				href="/merch/{product.id}"
				class="block"
				data-umami-event="product-click"
				data-umami-event-id={product.id}
				data-umami-event-name={product.name}
			>
				<img
					class="mb-2 aspect-square w-full bg-gradient-to-tr from-slate-700 object-cover"
					src={product.thumbnail_url}
					alt={product.name}
					loading="lazy"
					decoding="async"
					width="600"
					height="600"
				/>
				<h3 class="font-display text-2xl">{product.name}</h3>
				<p class="text-sm">
					{product.variants[0]?.retail_price}
					<span class="opacity-70">{product.variants[0]?.currency}</span>
				</p>
			</a>
		{/each}
	</div>
</section>

<section class="bg-gradient-3 px-5 py-20 text-center lg:px-10">
	<h2 class="font-display text-dark mb-2 text-3xl lg:text-4xl">Stay close.</h2>
	<p class="text-dark mx-auto mb-8 max-w-md text-sm opacity-80">
		Release dates, behind-the-scenes, and the occasional dispatch.
	</p>
	<div class="mx-auto max-w-md">
		<SubscribeForm darkMode />
	</div>
	{#if settings?.links?.length}
		<div class="mt-12 flex justify-center">
			<SocialLinks links={settings.links} color="var(--dark)" size={40} />
		</div>
	{/if}
</section>
