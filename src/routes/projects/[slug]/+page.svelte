<script>
	export let data;

	import SideBySide from '$lib/components/SideBySide.svelte';
	import { PortableText } from '@portabletext/svelte';
</script>

<SideBySide title={data.title} src={data.src} alt={data.alt} path="/projects/" />

<section class="portable-text">
	<h3>synopsis</h3>
	<PortableText value={data.body} />

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
