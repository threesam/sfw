<script>
	import Icons from '$components/Icons.svelte'
	import { slide } from 'svelte/transition'

	export let title = ''
	export let description = ''

	let toggle = false
</script>

<button
	on:click={() => (toggle = !toggle)}
	class="border-dark/50 flex w-full border-b py-4 text-sm"
>
	<div class={`rotate h-6 w-6 ${toggle ? 'down' : ''}`}>
		<Icons type="caretRight" strokeColor="#fff" />
	</div>
	<div class="ml-2 text-left">
		<div class="text-base font-bold">{title}</div>
		{#if toggle}
			<div class="pt-2" transition:slide={{ duration: 300 }}>{description}</div>
		{/if}
	</div>
</button>

<style>
	.rotate {
		-moz-transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
	}

	.rotate.down {
		-ms-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}
</style>
