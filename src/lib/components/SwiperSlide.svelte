<script>
	export let title = ''
	export let src = ''
	export let alt = ''
	export let href = ''

	import Image from './Image.svelte'
</script>

<a {href} class="relative aspect-[3/4] bg-red-500">
	<Image {src} {alt} />

	<h5 class={`grid h-full place-content-center p-5 ${src ? 'sr-only' : ''}`}>{title}</h5>
</a>
