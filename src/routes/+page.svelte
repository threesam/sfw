<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import Swiper from '$components/Swiper.svelte'

	export let data: PageData

	const { projects, products } = data.body

	const featuredProject = projects.find(({ isFeatured }) => isFeatured) ?? projects[0]
</script>

<Banner {...featuredProject} path="/projects/" />

<!-- <section class="grid h-96 w-full place-content-center bg-gradient-to-tl from-gray-700 to-gray-900">
	<div class="flex max-w-3xl flex-col items-center gap-5 p-5 lg:grid lg:grid-cols-2">
		<h2
			class="flex h-full w-full items-center justify-center border border-slate-700 bg-dark p-5 font-display text-3xl font-thin text-light"
		>
			our mission
		</h2>
		<p class="text-center lg:text-left">
			Skeleton Flowers and Water is an American film and television production company founded by
			director, screenwriter, producer, Laila Wolf, and director, producer Lisa Ann Wolf. The
			company is named in honor of Laila Wolf’s favored flower, the perennial plant Diphylleia
			grayi, commonly known as the Skeleton Flower and famed for one very peculiar distinguishing
			feature. Its white petals become transparent when touched by water. Once the delicate petals
			dry their original color returns, hence Skeleton Flowers and Water. Perception, point of view,
			perennials, what’s hidden underneath waiting to be seen? Come hither
		</p>
	</div>
</section> -->

<Swiper
	title="Featured Projects"
	slides={projects.filter(({ status }) => status !== 'pre-production')}
/>

<!-- <h4 class="font-display p-5 text-4xl lg:px-10">Merch</h4>
<div class="bg-dark mb-10 grid gap-10 lg:grid-cols-3 lg:gap-2 lg:px-10">
	{#each products as product, i}
		<a href="/merch/{product.id}" class={`${i % 2 === 0 ? 'pl-5' : 'pr-5'} lg:p-0`}>
			<img
				class="mb-2 max-w-full bg-gradient-to-tr from-slate-700"
				src={product.thumbnail_url}
				alt={product.name}
			/>
			<div class={`${i % 2 === 0 ? '' : 'pl-5'} lg:p-0`}>
				<h4>{product.name}</h4>
				<p>{product.variants[0].retail_price} - <span>{product.variants[0].currency}</span></p>
			</div>
		</a>
	{/each}
</div> -->

<Swiper
	title="In Development"
	slides={projects.filter(({ status }) => status === 'pre-production')}
/>
