<script>
	// import Swiper core and required modules
	import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

	import { Swiper, SwiperSlide } from 'swiper/svelte';

	const slides = [{}];

	// Import Swiper styles
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'swiper/css/scrollbar';
</script>

<Swiper
	modules={[Navigation, Pagination, Scrollbar, A11y]}
	spaceBetween={50}
	slidesPerView={3}
	navigation
	pagination={{ clickable: true }}
	scrollbar={{ draggable: true }}
	on:slideChange={() => console.log('slide change')}
	on:swiper={(e) => console.log(e.detail[0])}
>
	{#each slides as slide}
		<!-- <SwiperSlide><Slide {...slide} /></SwiperSlide> -->
	{:else}
		<!-- empty list -->
	{/each}
	...
</Swiper>
