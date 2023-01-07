<script>
	export let data = {};
	const icons = data.icons;

	import SubscribeForm from '$lib/components/SubscribeForm.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	import P5 from 'p5-svelte';
	let points = [];

	const sketch = (p5) => {
		var mapimgs;

		p5.preload = () => {
			mapimgs = icons.map((icon) => p5.loadImage(icon.src));
		};
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);

			for (let i = 0; i < 2000; i++) {
				const size = p5.random(10, 30);
				const x = p5.random(p5.windowWidth - size);
				const y = p5.random(p5.windowHeight);

				let collision;
				points.forEach((point) => {
					if (p5.dist(x, y, point.x, point.y) < 35) {
						collision = true;
					}
				});

				if (!collision) {
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

<section>
	<div class="container">
		<P5 {sketch} />
	</div>
	<div class="content">
		<h2>Subscribe</h2>
		<SubscribeForm />
		<h2>Follow</h2>
		<SocialLinks />
	</div>
</section>

<style>
	section {
		/* background-color: #f9c84c; */
		height: calc(100vh - 3rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* padding: 2rem; */
		position: relative;
	}

	.container {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content {
		background: rgba(249, 200, 76, 0.9);
		padding: 2rem;
		/* border: 0.25rem solid var(--textColor); */
	}

	h2 {
		margin: 0;
		margin-bottom: 0.5rem;
		color: var(--background);
	}

	h2:nth-of-type(2) {
		margin-top: 2rem;
	}
</style>
