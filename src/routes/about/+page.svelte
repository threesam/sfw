<script>
	import Image from '$components/Image.svelte'
	import PortableText from '$components/PortableText.svelte'

	export let data
	const { settings } = data.body
</script>

<div class="mx-auto max-w-3xl">
	<Image src={settings.image.asset.url} alt="" />
</div>

<PortableText blocks={settings.body} />

<h3 class="mx-auto max-w-2xl px-5 font-thin">Founders</h3>
<section class="mx-auto mb-20 grid max-w-2xl gap-5 p-5 lg:grid-cols-2">
	{#each settings.founders as { name, image, link }}
		<a href={link ?? '#'} class="relative aspect-square">
			<img src={image?.asset.url} alt="" />
			<div class="absolute inset-0 bg-black/50" />
			<h4 class="bg-primary text-dark absolute left-0 top-0 p-3">{name}</h4>
		</a>
	{/each}
</section>
