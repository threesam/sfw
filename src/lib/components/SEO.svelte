<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import imageBuilder from '../utils/imageUrlBuilder';

	import { page } from '$app/stores';
	const host = 'https://skeletonflowersandwater.com';
	const SEO_IMAGE_WIDTH = 1200;
	const SEO_IMAGE_HEIGHT = 1200;
	const TWITTER_IMAGE_HEIGHT = 628;
	export let title = '';
	export let description = '';
	export let publishedAt = '';
	export let image = '';
	export let alt = '';
	export let tags: string[] = [];
	export let type = 'website';
</script>

{#if type !== 'website'}
	<SvelteSeo
		{title}
		{description}
		openGraph={{
			title,
			description,
			url: host + $page.route.id,
			type: 'article',
			article: {
				publishedTime: publishedAt,
				authors: [host + '/about'],
				tags
			},
			images: [
				{
					url: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(SEO_IMAGE_HEIGHT).url(),
					// url: image,
					width: SEO_IMAGE_WIDTH,
					height: SEO_IMAGE_HEIGHT,
					alt
				}
			]
		}}
		twitter={{
			title,
			description,
			image: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(TWITTER_IMAGE_HEIGHT).url(),
			imageAlt: alt
		}}
	/>
{:else}
	<SvelteSeo
		{title}
		{description}
		openGraph={{
			title,
			description,
			url: host + $page.route.id,
			type: 'website',
			images: [
				{
					url: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(SEO_IMAGE_HEIGHT).url(),
					width: SEO_IMAGE_WIDTH,
					height: SEO_IMAGE_HEIGHT,
					alt
				}
			]
		}}
		twitter={{
			title,
			description,
			image: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(TWITTER_IMAGE_HEIGHT).url(),
			imageAlt: alt
		}}
	/>
{/if}
