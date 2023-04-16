<script>
	export let data
	console.log('data', data);
	import Image from '$components/Image.svelte';
	import PortableText from '$components/PortableText.svelte';
</script>

<div class="mx-auto max-w-3xl">
	<Image src={data.image.asset.url} alt="" />
</div>

<PortableText blocks={data.body} />
