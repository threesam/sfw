<script lang="ts">
	import type { PageData } from './$types'
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import P5 from 'p5-svelte';
	import SubscribeForm from '$lib/components/SubscribeForm.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	
	export const prerender = true
	export let data: PageData;
	
	const { settings } = data.body
	const icons = settings.icons;
	let show = false;

	onMount(() => {
		show = true;
	});

	// SKETCH
	let points = [];

	const sketch = (p5) => {
		var mapimgs;

		p5.preload = () => {
			mapimgs = icons.map((icon) => p5.loadImage(icon.src));
		};
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);

			for (let i = 0; i < 1000; i++) {
				const size = p5.random(5, 40);
				const x = p5.random(p5.windowWidth - size);
				const y = p5.random(p5.windowHeight);

				let collision;
				points.forEach((point) => {
					if (p5.dist(x, y, point.x, point.y) < 50) {
						collision = true;
					}
				});

				if (!collision && mapimgs.length) {
					points.push({ x, y, size, icon: Math.floor(p5.random(mapimgs.length)) });
				}
			}
		};

		p5.draw = () => {
			p5.frameRate(24);
			p5.background(249, 200, 76);

			points.forEach(({ x, y, size, icon }, i) => {
				if (y < -size) {
					points[i].y = p5.windowHeight + size;
				} else {
					points[i].y -= 1;
				}

				p5.image(mapimgs[icon], x, y, size, size);
			});
		};
	};
</script>

<section class="flex flex-col justify-center items-center relative" style="height: calc(100vh - var(--headerHeight));">
	{#if show}
		<div in:fade={{ duration: 3000 }} class="absolute inset-0 w-full h-full overflow-hidden">
			<P5 {sketch} />
		</div>
	{/if}
	<div class="relative bg-primary p-5 text-black font-bold border-2 border-black">
		<h2 class="font-sans text-2xl mb-2">Subscribe</h2>
		<SubscribeForm />
		<h2 class="font-sans text-2xl mb-2 mt-8">Follow</h2>
		<SocialLinks links={settings.links} size={60} />
	</div>
</section>
