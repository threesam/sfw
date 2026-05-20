<script lang="ts">
	import type { PageData } from './$types'
	import { fade } from 'svelte/transition'
	import SubscribeForm from '$lib/components/SubscribeForm.svelte'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
	import { onMount } from 'svelte'

	let { data }: { data: PageData } = $props()
	const { settings } = data.body
	const icons = (settings.icons ?? []) as { src: string }[]

	let canvas = $state<HTMLCanvasElement | null>(null)
	let stage = $state<HTMLElement | null>(null)
	let show = $state(false)

	$effect(() => {
		show = true
	})

	onMount(() => {
		if (!canvas || !stage) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const dpr = Math.min(window.devicePixelRatio || 1, 2)

		type P = { x: number; y: number; size: number; img: HTMLImageElement }
		let w = 0
		let h = 0
		let points: P[] = []
		let rafId = 0
		let imgs: HTMLImageElement[] = []
		let mounted = true

		function resize() {
			if (!canvas || !stage) return
			w = stage.clientWidth
			h = stage.clientHeight
			canvas.width = Math.floor(w * dpr)
			canvas.height = Math.floor(h * dpr)
			canvas.style.width = `${w}px`
			canvas.style.height = `${h}px`
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
			seed()
		}

		function seed() {
			points = []
			if (!imgs.length) return
			for (let i = 0; i < 1000; i++) {
				const size = 5 + Math.random() * 35
				const x = Math.random() * (w - size)
				const y = Math.random() * h
				let collision = false
				for (const p of points) {
					const dx = p.x - x
					const dy = p.y - y
					if (dx * dx + dy * dy < 2500) {
						collision = true
						break
					}
				}
				if (!collision) {
					const img = imgs[Math.floor(Math.random() * imgs.length)]
					if (img) points.push({ x, y, size, img })
				}
			}
		}

		function frame() {
			if (!ctx) return
			ctx.fillStyle = 'rgb(249, 200, 76)'
			ctx.fillRect(0, 0, w, h)
			for (const p of points) {
				if (p.y < -p.size) p.y = h + p.size
				else if (!reduce) p.y -= 1
				ctx.drawImage(p.img, p.x, p.y, p.size, p.size)
			}
			if (mounted && !reduce) rafId = requestAnimationFrame(frame)
		}

		async function load() {
			imgs = await Promise.all(
				icons.map(
					(icon) =>
						new Promise<HTMLImageElement>((resolve, reject) => {
							const img = new Image()
							img.onload = () => resolve(img)
							img.onerror = reject
							img.src = icon.src
						}),
				),
			).catch(() => [])
			if (!mounted) return
			resize()
			const kick = () => {
				rafId = requestAnimationFrame(frame)
			}
			const ric = (
				window as Window & {
					requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
				}
			).requestIdleCallback
			if (ric) ric(kick, { timeout: 800 })
			else setTimeout(kick, 250)
		}

		load()
		const onResize = () => resize()
		window.addEventListener('resize', onResize)
		return () => {
			mounted = false
			cancelAnimationFrame(rafId)
			window.removeEventListener('resize', onResize)
		}
	})
</script>

<section
	bind:this={stage}
	class="relative flex flex-col items-center justify-center"
	style="height: calc(100vh - var(--headerHeight));"
>
	{#if show}
		<div in:fade={{ duration: 3000 }} class="absolute inset-0 h-full w-full overflow-hidden">
			<canvas bind:this={canvas} aria-hidden="true" class="block h-full w-full"></canvas>
		</div>
	{/if}
	<div class="bg-dark border-dark text-dark relative border-2 p-5 font-bold lg:p-10">
		<h2 class="text-light mb-2 font-sans text-2xl">Subscribe</h2>
		<SubscribeForm />
		<h2 class="text-light mb-2 mt-8 font-sans text-2xl">Follow</h2>
		<SocialLinks links={settings.links} color="var(--primary)" size={60} />
	</div>
</section>
