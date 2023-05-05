<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import SideBySide from '$lib/components/SideBySide.svelte'
	import Swiper from '$components/Swiper.svelte'

	export let data: PageData

	const { projects, products } = data.body
	console.log('products: ', products)
</script>

<div class="flex flex-col pt-10 last:mb-20">
	{#each projects.slice(1) as project, index}
		<SideBySide {...project} {index} path="/projects/" />
	{/each}
</div>
