<script>
	// import Swiper core and required modules
	import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import Slide from './Slide.svelte';

	export let slides = [];
	export let title = '';

	// Import Swiper styles
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'swiper/css/scrollbar';
</script>

{#if slides.length}
	<!-- content here
	<Swiper
		modules={[Navigation, Pagination, Scrollbar, A11y]}
		spaceBetween={25}
		slidesPerView={2}
		navigation
		pagination={{ clickable: true }}
		scrollbar={{ draggable: true }}
		on:slideChange={() => console.log('slide change')}
		on:swiper={(e) => console.log(e.detail[0])}
	>
		{#each slides as slide}
			<SwiperSlide><Slide {...slide} /></SwiperSlide>
		{/each}
	</Swiper> -->
	<section>
		<h2>{title}</h2>
		<div class="slides">
			{#each slides as slide}
				<Slide {...slide} />
			{/each}
		</div>
	</section>
{/if}

<style>
	section {
		width: 100%;
		padding: var(--containerPadding);
		height: 50vh;
	}
	h2 {
		margin-top: 0;
	}
	.slides {
		width: 100%;
		height: 100%;
		max-height: 100%;
		display: flex;
		gap: 2rem;
		justify-content: center;
	}
</style>
