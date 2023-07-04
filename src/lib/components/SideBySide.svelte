<script lang="ts">
	export let project
	export let path = '/'
	export let buttonText = 'learn more'
	export let index = 0
	const { title, description, slug, status, image, posters } = project ?? {}
	const { src, alt, caption, color } = image ?? {}

	import Image from './Image.svelte'
</script>

<section
	style="--primary: {color}"
	class="text-light mx-auto mb-10 flex max-w-full flex-col items-start lg:my-0 lg:grid lg:grid-cols-2 lg:items-center"
>
	<div class={`grayscale ${index % 2 === 0 ? 'lg:order-last' : ''}`}>
		<Image src={src ?? posters?.[0].url} {alt} {caption} />
	</div>

	<div
		class={`flex h-full w-full flex-col items-start justify-center px-5 pb-10 pt-5 lg:items-center ${
			index % 2 === 0 ? 'lg:text-end' : ''
		}`}
	>
		<div
			class="flex w-full max-w-lg flex-col justify-center lg:mx-auto lg:items-center lg:text-center"
		>
			<span class="mb-2 text-sm">{status.replace(/-/g, ' ')}</span>

			<h3 class="font-display sm:text-2xl lg:text-5xl">{title}</h3>

			<p class="pb-3 lg:py-3">{description}</p>

			{#if slug}
				<a
					class="hover:text-primary underline underline-offset-4 transition-all duration-300 hover:underline-offset-2"
					href={path + slug}>{buttonText}</a
				>
			{/if}
		</div>
	</div>
</section>
