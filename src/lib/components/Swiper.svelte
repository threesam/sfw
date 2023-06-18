<script lang="ts">
	export let slides = []
	console.log('slides: ', slides)
	export let title = ''

	import Image from '$components/Image.svelte'
	import Icons from '$components/Icons.svelte'
	import { register } from 'swiper/element/bundle'

	register()

	let clientWidth: number
	let swiperEl: any
	const spaceBetween = 0

	let slideWidth

	$: isBeginning = false
	$: isEnd = true

	const onProgress = (e) => {
		const [swiper, progress] = e.detail
		isBeginning = swiper.isBeginning
		isEnd = swiper.isEnd
	}
</script>

<section class="relative bg-dark py-10" bind:clientWidth>
	{#if clientWidth}
		<div class="lg:px-10">
			<div class="flex justify-between p-5 lg:px-0">
				{#if title}
					<h2 class="font-display text-light shadow-primary drop-shadow-lg">{title}</h2>
				{/if}
				<a
					class="hidden underline underline-offset-4 transition-all duration-300 hover:underline-offset-2 lg:block"
					href="/projects">view all</a
				>
			</div>

			{#if !isBeginning}
				<button
					class="absolute left-0 top-0 z-10 hidden h-full w-10 rotate-180 items-center justify-center bg-dark lg:flex"
					on:click={() => swiperEl.swiper.slidePrev()}
				>
					<Icons type="caretRight" strokeColor="var(--primary)" />
					<span class="sr-only">next</span>
				</button>
			{/if}

			<swiper-container
				style="--swiper-pagination-color: var(--primary); --swiper-pagination-bullet-inactive-color: #fff; --swiper-pagination-bullet-border-radius: 0"
				bind:this={swiperEl}
				breakpoints={{
					1024: {
						slidesPerView: 3.3
					},
					640: {
						slidesPerView: 2.3
					}
				}}
				pagination={{
					type: 'bullets',
					clickable: true
				}}
				slides-per-view={1.3}
				space-between={spaceBetween}
				centered-slides={false}
				on:progress={onProgress}
			>
				{#each slides as { slug, title, image, posters }}
					<swiper-slide class="mb-10" bind:clientWidth={slideWidth}>
						{#if slideWidth}
							<a href={`/projects/${slug}`} class="relative aspect-[3/4] bg-red-500">
								<Image src={image?.src} alt={title} />
								{#if posters?.[0]?.url}
									<span
										class="absolute inset-0 aspect-[3/4] h-full w-full bg-black opacity-0 hover:opacity-100"
									>
										<img
											class="mx-auto h-full object-contain"
											src={posters?.[0]?.url}
											alt={title}
										/>
									</span>
								{/if}
								<h5 class={`h-full py-5 text-center`}>
									{title}
								</h5>
							</a>
						{/if}
					</swiper-slide>
				{/each}
				<swiper-slide
					class="relative mb-10 grid aspect-[3/4] h-full place-content-center border-2 border-primary bg-dark bg-gradient-3 text-dark lg:hidden"
				>
					{#if slideWidth}
						<a
							href={`/projects/`}
							class="absolute inset-0 grid place-content-center text-lg lowercase underline underline-offset-2"
							>all projects</a
						>
					{/if}
				</swiper-slide>
			</swiper-container>

			{#if !isEnd}
				<button
					class="absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-dark lg:flex"
					on:click={() => swiperEl.swiper.slideNext()}
				>
					<Icons type="caretRight" strokeColor="var(--primary)" />
					<span class="sr-only">previous</span>
				</button>
			{/if}
		</div>
	{/if}
</section>
