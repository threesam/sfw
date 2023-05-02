<script lang="ts">
	import type { PageData } from './$types'
	import Banner from '$lib/components/Banner.svelte'
	import SideBySide from '$lib/components/SideBySide.svelte'

	export let data: PageData

	const { projects } = data.body
	const first = projects.shift()
</script>

<Banner {...first} path="/projects/" />
<div class="flex flex-col pt-10 last:mb-20">
	{#each projects as project, index}
		<SideBySide {...project} {index} path="/projects/" />
	{/each}
</div>
