<script>
	export let data;
	const project = data.data;

	import SideBySide from '$lib/components/SideBySide.svelte';
	import { PortableText } from '@portabletext/svelte';
</script>

<SideBySide {...project} path="/projects/" />

<section class="portable-text">
	<h3>synopsis</h3>
	<PortableText value={project.body} />

	<h3>cast + crew</h3>
	<p>coming soon</p>
</section>

<style>
	section {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
