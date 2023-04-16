<script>
	export let title = '';
	export let src = '';
	export let alt = '';
	export let description = '';

	import Image from "./Image.svelte";
</script>

<div>
	{#if src}
		<Image {src} {alt} />
	{/if}

	{#if title}
		<h5>{title}</h5>
	{/if}

	{#if description}
		<p>{description}</p>
	{/if}
</div>
