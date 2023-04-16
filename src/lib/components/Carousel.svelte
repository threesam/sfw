<script>
	import Slide from './Slide.svelte';

	export let slides = [];
	export let title = '';
</script>

{#if slides?.length}
	<section class="pt-10 h-max flex justify-center">
		<h2>{title}</h2>
		<div class="slides">
			{#each slides as slide}
				<Slide {...slide} />
			{/each}
		</div>
	</section>
{/if}
