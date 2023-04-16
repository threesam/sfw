<script>
	export let title = '';
	export let description = '';
	export let path = '/';
	export let slug = '';
	export let buttonText = 'learn more';
	export let index = 0;
	export let image = {};
	const { src, alt, caption, color, hotspot, crop } = image;

	import Image from './Image.svelte';
</script>

<section class="flex flex-col lg:grid lg:grid-cols-2 max-w-5xl mx-auto items-start my-5 lg:mb-0">
	<div class={`lg:border-2 lg:border-white ${index % 2 === 0 ? 'lg:order-last' : ''}`}>
		<Image {src} {alt} {caption} {crop} />
	</div>
	<div class={`p-5 ${index % 2 === 0 ? 'lg:text-end' : ''}`} style="--primary: {color}">
		<h3 class="hidden sm:block sm:text-2xl sm:mb-4 lg:text-3xl" style={color && `color: ${color}`}>{title}</h3>
		<p class="pb-3 lg:py-3">{description}</p>

		{#if slug}
			<a class="transition-all duration-300 underline underline-offset-4 hover:underline-offset-2 hover:text-primary" href={path + slug}>{buttonText}</a>
		{/if}
	</div>
</section>