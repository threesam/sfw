<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	const { settings } = data.body
</script>

<section class="relative flex h-screen items-center justify-center">
	<img
		class="absolute inset-0 mx-auto object-contain opacity-5"
		src={settings.image.asset.url}
		alt=""
	/>
	<div class="relative z-0 mb-20 max-w-4xl">
		<h1 class="mb-5 text-4xl">Thanks for your order!</h1>
		<a
			class="font-display hover:border-primary hover:bg-primary hover:text-dark flex w-full items-center justify-center border p-4 text-lg text-white opacity-90 transition-all duration-300 hover:font-bold"
			href="/">visit homepage</a
		>
	</div>
</section>
