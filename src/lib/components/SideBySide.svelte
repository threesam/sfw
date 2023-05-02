<script lang="ts">
	export let title = ''
	export let description = ''
	export let path = '/'
	export let slug = ''
	export let buttonText = 'learn more'
	export let index = 0
	export let image: any = {}
	const { src, alt, caption, color } = image

	import Image from './Image.svelte'
</script>

<section
	style="--primary: {color}"
	class="mx-auto my-5 flex max-w-5xl flex-col items-center lg:my-0 lg:grid lg:grid-cols-2"
>
	<div class={`lg:border-2 lg:border-primary ${index % 2 === 0 ? 'lg:order-last' : ''}`}>
		<Image {src} {alt} {caption} />
	</div>
	<div class={`px-5 pb-10 pt-5 ${index % 2 === 0 ? 'lg:text-end' : ''}`}>
		<h3 class="hidden text-primary sm:mb-3 sm:block sm:text-2xl lg:text-3xl">{title}</h3>
		<p class="pb-3 lg:py-3">{description}</p>

		{#if slug}
			<a
				class="underline underline-offset-4 transition-all duration-300 hover:text-primary hover:underline-offset-2"
				href={path + slug}>{buttonText}</a
			>
		{/if}
	</div>
</section>
