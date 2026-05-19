<script lang="ts">
	import Image from '$components/Image.svelte'
	import Icons from '$components/Icons.svelte'
	import type { Project } from '$types'
	import { onMount, tick } from 'svelte'
	import { optimize } from '$lib/utils/img'

	export let slides: Project[] = []
	export let title = ''

	let track: HTMLDivElement
	let isBeginning = true
	let isEnd = false

	function update() {
		if (!track) return
		isBeginning = track.scrollLeft <= 1
		isEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
	}

	function scrollByDir(dir: 1 | -1) {
		if (!track) return
		const first = track.firstElementChild as HTMLElement | null
		const step = first ? first.getBoundingClientRect().width : track.clientWidth * 0.8
		track.scrollBy({ left: dir * step, behavior: 'smooth' })
	}

	onMount(async () => {
		await tick()
		update()
	})
</script>

<section class="bg-dark relative py-10">
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

		<div class="relative">
			{#if !isBeginning}
				<button
					type="button"
					aria-label="previous"
					class="bg-dark absolute left-0 top-0 z-10 hidden h-full w-10 rotate-180 items-center justify-center lg:flex"
					on:click={() => scrollByDir(-1)}
				>
					<Icons type="caretRight" strokeColor="var(--primary)" />
				</button>
			{/if}

			<div
				bind:this={track}
				on:scroll={update}
				class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
			>
				{#each slides as { slug, title: slideTitle, image, posters }}
					<div
						class="mb-10 w-[78vw] flex-none snap-start pr-2 sm:w-[44vw] lg:w-[30%]"
					>
						<a href={`/projects/${slug}`} class="relative block aspect-[3/4] bg-red-500">
							<div class="absolute inset-0 grayscale">
								<Image src={image?.src} alt={slideTitle} width={800} />
							</div>
							{#if posters?.[0]?.url}
								<span
									class="absolute inset-0 aspect-[3/4] h-full w-full bg-black opacity-0 hover:opacity-100"
								>
									<img
										class="mx-auto h-full object-contain"
										src={optimize(posters[0].url, { w: 800 })}
										alt={slideTitle}
										loading="lazy"
										decoding="async"
										width="600"
										height="800"
									/>
								</span>
							{/if}
							<h5 class="h-full py-5 text-center">{slideTitle}</h5>
						</a>
					</div>
				{/each}
				<div
					class="border-primary bg-dark bg-gradient-3 text-dark relative mb-10 grid w-[78vw] flex-none snap-start place-content-center border-2 pr-2 sm:w-[44vw] lg:hidden"
				>
					<a
						href="/projects/"
						class="absolute inset-0 grid place-content-center text-lg lowercase underline underline-offset-2"
						>all projects</a
					>
				</div>
			</div>

			{#if !isEnd}
				<button
					type="button"
					aria-label="next"
					class="bg-dark absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center lg:flex"
					on:click={() => scrollByDir(1)}
				>
					<Icons type="caretRight" strokeColor="var(--primary)" />
				</button>
			{/if}
		</div>
	</div>
</section>
