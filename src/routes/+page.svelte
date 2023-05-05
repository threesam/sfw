<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import Swiper from '$components/Swiper.svelte'

	export let data: PageData

	const { projects, products } = data.body
	console.log('products: ', products[0].variants)
</script>

<Banner {...projects[0]} path="/projects/" />

<Swiper title="Films" slides={projects.slice(1)} />

<div class="bg-dark mb-10 grid gap-10 p-5 lg:grid-cols-3 lg:gap-2">
	{#each products as product}
		<div class="">
			<img class="max-w-full bg-gradient-to-tr from-slate-100" src={product.thumbnail_url} alt="" />
			<h4>{product.name}</h4>
			<p>{product.variants[0].retail_price} - <span>{product.variants[0].currency}</span></p>
		</div>
	{/each}
</div>
