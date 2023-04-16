<script lang="ts">
	export let title = '';
	export let description = '';
	export let path = '/';
	export let slug = '';
	export let buttonText = 'learn more';
	export let index = 0;
	export let image: any = {};
	const { src, alt, caption, color} = image;

	import Image from './Image.svelte';
</script>

<section style="--primary: {color}" class="flex flex-col lg:grid lg:grid-cols-2 max-w-5xl mx-auto items-center my-5 lg:my-0">
	<div class={`lg:border-2 lg:border-primary ${index % 2 === 0 ? 'lg:order-last' : ''}`}>
		<Image {src} {alt} {caption} />
	</div>
	<div class={`px-5 pt-5 pb-10 ${index % 2 === 0 ? 'lg:text-end' : ''}`} >
		<h3 class="hidden sm:block sm:text-2xl sm:mb-3 lg:text-3xl text-primary">{title}</h3>
		<p class="pb-3 lg:py-3">{description}</p>

		{#if slug}
			<a class="transition-all duration-300 underline underline-offset-4 hover:underline-offset-2 hover:text-primary" href={path + slug}>{buttonText}</a>
		{/if}
	</div>
</section>