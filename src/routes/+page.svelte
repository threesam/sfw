<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import Swiper from '$components/Swiper.svelte'

	export let data: PageData
	console.log('data: ', data)

	const { projects, products } = data.body
	console.log('products: ', products[0].variants)
</script>

<Banner {...projects[0]} path="/projects/" />

<section class="grid h-96 w-full place-content-center bg-gradient-to-tl from-gray-700 to-gray-900">
	<div class="flex max-w-3xl flex-col items-center gap-5 p-5 lg:grid lg:grid-cols-2">
		<h2
			class="font-display flex h-full w-full items-center justify-center border p-5 text-5xl font-bold"
		>
			Our Mission
		</h2>
		<p class="text-center lg:text-left">
			Magna eiusmod qui in voluptate eu proident dolor magna officia esse nostrud do. Id cupidatat
			amet eiusmod ad. Minim do nisi fugiat labore sit cillum cupidatat anim esse excepteur sint.
		</p>
	</div>
</section>

<Swiper title="Films" slides={projects.slice(1)} />

<h4 class="font-display px-5 text-4xl lg:px-10">Merch</h4>
<div class="bg-dark mb-10 grid gap-10 p-5 lg:grid-cols-3 lg:gap-2 lg:p-10">
	{#each products as product}
		<div class="">
			<img
				class="mb-2 max-w-full bg-gradient-to-tr from-slate-100"
				src={product.thumbnail_url}
				alt=""
			/>
			<h4>{product.name}</h4>
			<p>{product.variants[0].retail_price} - <span>{product.variants[0].currency}</span></p>
		</div>
	{/each}
</div>
