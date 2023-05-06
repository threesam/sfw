<script lang="ts">
	import type { PageData } from './$types'
	import SideBySide from '$lib/components/SideBySide.svelte'

	export let data: PageData

	const { projects } = data.body
</script>

<div class="flex flex-col pt-10 last:mb-20">
	{#each projects.slice(1) as project, index}
		<SideBySide {...project} {index} path="/projects/" />
	{/each}
</div>
