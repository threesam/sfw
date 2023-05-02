<script lang="ts">
	import SvelteSeo from 'svelte-seo'
	import { urlFor } from '../utils/sanity'

	import { page } from '$app/stores'
	const host = 'https://skeletonflowersandwater.com'
	const SEO_IMAGE_WIDTH = 1200
	const SEO_IMAGE_HEIGHT = 1200
	const TWITTER_IMAGE_HEIGHT = 628
	export let title = ''
	export let description = ''
	export let image = ''
	export let alt = ''
</script>

<SvelteSeo
	{title}
	{description}
	openGraph={{
		title,
		description,
		url: host + $page.route.id,
		type: 'website',
		images: image
			? [
					{
						url: urlFor(image).width(SEO_IMAGE_WIDTH).height(SEO_IMAGE_HEIGHT).url(),
						width: SEO_IMAGE_WIDTH,
						height: SEO_IMAGE_HEIGHT,
						alt
					}
			  ]
			: []
	}}
	twitter={{
		title,
		description,
		image: image ? urlFor(image).width(SEO_IMAGE_WIDTH).height(TWITTER_IMAGE_HEIGHT).url() : '',
		imageAlt: alt
	}}
/>
