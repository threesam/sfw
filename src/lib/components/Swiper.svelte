<script lang="ts">
	export let slides = []
	export let title = ''

	import Slide from '$components/SwiperSlide.svelte'
	import Icons from '$components/Icons.svelte'
  import { register } from 'swiper/element/bundle'

	function getSlides(clientWidth: number) {
		if (clientWidth > 1024) {
			return 4
		} else if (clientWidth > 640) {
			return 3
		} else {
			return 2
		}
	}

	register()

	let clientWidth: number
	let swiperEl: any
	const spaceBetween = 20

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

<section class="py-10 px-5 lg:px-0" bind:clientWidth>
	{#if clientWidth}
		<div class="relative mx-auto h-max max-w-6xl">
			<div class="flex justify-between">
				{#if title}
					<h2 class="pb-5 font-display">{title}</h2>
				{/if}
			</div>

			{#if !isBeginning}
				<button
					class="absolute left-[-2rem] top-[42%] hidden rotate-180 lg:block"
					on:click={() => swiperEl.swiper.slidePrev()}
					><Icons type="caretRight" />
					<span class="sr-only">next</span>
				</button>
			{/if}

			<swiper-container
				style="--swiper-pagination-color: #FF1966; --swiper-pagination-bullet-border-radius: 0"
				bind:this={swiperEl}
				pagination={{
					type: 'bullets',
					clickable: true
				}}
				slides-per-view={slidesPerView}
				space-between={spaceBetween}
				centered-slides={true}
				on:progress={onProgress}
			>
				{#each slides as slide}
					<swiper-slide class="mb-10" bind:clientWidth={slideWidth}>
						{#if slideWidth}
            	<Slide {...slide} />
						{/if}
					</swiper-slide>
				{:else}
					<span>no products!</span>
				{/each}
			</swiper-container>

			{#if !isEnd}
				<button
					class="absolute right-[-2rem] top-[42%] hidden lg:block"
					on:click={() => swiperEl.swiper.slideNext()}
					><Icons type="caretRight" />
					<span class="sr-only">previous</span>
				</button>
			{/if}
		</div>
	{/if}
</section>
