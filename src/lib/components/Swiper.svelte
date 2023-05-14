<script lang="ts">
	export let slides = []
	export let title = ''

	import Image from '$components/Image.svelte'
	import Icons from '$components/Icons.svelte'
	import { register } from 'swiper/element/bundle'

	function getSlides(clientWidth: number) {
		if (clientWidth > 1024) {
			return 3.3
		} else if (clientWidth > 640) {
			return 2.3
		} else {
			return 1.3
		}
	}

	register()

	let clientWidth: number
	let swiperEl: any
	const spaceBetween = 0

	let slideWidth

	$: isBeginning = false
	$: isEnd = true
	$: slidesPerView = getSlides(clientWidth)

	const onProgress = (e) => {
		const [swiper, progress] = e.detail
		isBeginning = swiper.isBeginning
		isEnd = swiper.isEnd
	}
</script>

<section class="bg-dark relative py-10" bind:clientWidth>
	{#if clientWidth}
		<div class="lg:px-10">
			<div class="flex justify-between p-5 lg:px-0">
				{#if title}
					<h2 class="font-display">{title}</h2>
				{/if}
				<a
					class="hidden underline underline-offset-4 transition-all duration-300 hover:underline-offset-2 lg:block"
					href="/projects">view all</a
				>
			</div>

			{#if !isBeginning}
				<button
					class="bg-dark absolute left-0 top-0 z-10 hidden h-full w-10 rotate-180 items-center justify-center lg:flex"
					on:click={() => swiperEl.swiper.slidePrev()}
				>
					<Icons type="caretRight" strokeColor="var(--primary)" />
					<span class="sr-only">next</span>
				</button>
			{/if}

			<swiper-container
				style="--swiper-pagination-color: var(--primary); --swiper-pagination-bullet-inactive-color: #fff; --swiper-pagination-bullet-border-radius: 0"
				bind:this={swiperEl}
				pagination={{
					type: 'bullets',
					clickable: true
				}}
				slides-per-view={slidesPerView}
				space-between={spaceBetween}
				centered-slides={false}
				on:progress={onProgress}
			>
				{#each slides as { slug, title, image }}
					<swiper-slide class="mb-10" bind:clientWidth={slideWidth}>
						{#if slideWidth}
							<a href={`/projects/${slug}`} class="relative aspect-[3/4] bg-red-500">
								<Image src={image?.src} alt={title} isPoster={!!image?.src} />
								<h5 class={`grid h-full place-content-center p-5 ${image?.src ? 'sr-only' : ''}`}>
									{title}
								</h5>
							</a>
						{/if}
					</swiper-slide>
				{/each}
				<swiper-slide
					class="bg-gradient-3 bg-dark text-light border-light relative mb-10 grid aspect-[3/4] h-full place-content-center border-2 lg:hidden"
				>
					{#if slideWidth}
						<a
							href={`/projects/`}
							class="absolute inset-0 grid place-content-center text-lg uppercase">all projects</a
						>
					{/if}
				</swiper-slide>
			</swiper-container>

			{#if !isEnd}
				<button
					class="bg-dark absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center lg:flex"
					on:click={() => swiperEl.swiper.slideNext()}
				>
					<Icons type="caretRight" strokeColor="var(--primary)" />
					<span class="sr-only">previous</span>
				</button>
			{/if}
		</div>
	{/if}
</section>
