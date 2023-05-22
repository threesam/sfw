<script>
	import { fly } from 'svelte/transition'
	export let text = ''
</script>

{#if text}
	<span
		in:fly={{ x: -100, delay: 400 }}
		class="bg-dark shadow-primary -ml-5 mb-4 inline-block border border-l-0 border-slate-700 px-5 py-2 text-sm tracking-wider text-slate-300 shadow-sm"
	>
		{text}
	</span>
{/if}
