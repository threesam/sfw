<script>
	export let title = '';
	export let src = '';
	export let alt = '';
	export let description = '';
</script>

<div class="h-96">
	{#if src}
		<img class="h-96 w-auto" {src} {alt} />
	{/if}

	{#if title}
		<h5>{title}</h5>
	{/if}

	{#if description}
		<p>{description}</p>
	{/if}
</div>
