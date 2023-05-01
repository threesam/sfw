<script>
	import Image from '$components/Image.svelte';
	import PortableText from '$components/PortableText.svelte';

	export let data
	const { settings } = data.body
</script>

<div class="mx-auto max-w-3xl">
	<Image src={settings.image.asset.url} alt="" />
</div>

<PortableText blocks={settings.body} />
