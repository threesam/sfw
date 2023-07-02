<script lang="ts">
	export let project
	export let path = '/'
	export let buttonText = 'learn more'
	export let index = 0
	const { title, description, slug, status, image, posters } = project ?? {}
	const { src, alt, caption, color } = image ?? {}

	import Badge from './Badge.svelte'
	import Image from './Image.svelte'
</script>

<section
	style="--primary: {color}"
	class="mx-auto my-5 flex max-w-full flex-col items-start lg:my-0 lg:grid lg:grid-cols-2 lg:items-center"
>
	<div class={`${index % 2 === 0 ? 'lg:order-last' : ''}`}>
		<Image src={src ?? posters?.[0].url} {alt} {caption} />
	</div>
	<div class={`px-5 pb-10 pt-5 ${index % 2 === 0 ? 'lg:text-end' : ''}`}>
		<div class="block lg:hidden">
			<Badge text={status.replace(/-/g, ' ')} />
		</div>
		<span class="mb-2 hidden text-sm lg:block">{status.replace(/-/g, ' ')}</span>
		<h3 class="font-display text-primary sm:text-2xl lg:text-3xl">{title}</h3>
		<p class="pb-3 lg:py-3">{description}</p>

		{#if slug}
			<a
				class="hover:text-primary underline underline-offset-4 transition-all duration-300 hover:underline-offset-2"
				href={path + slug}>{buttonText}</a
			>
		{/if}
	</div>
</section>
