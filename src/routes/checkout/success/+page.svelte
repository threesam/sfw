<script lang="ts">
	import type { PageData } from './$types'
	import { optimize } from '$lib/utils/img'
	import { track } from '$lib/utils/umami'
	import { onMount } from 'svelte'

	let { data }: { data: PageData } = $props()

	const { settings } = data.body

	// ponytail: success_url has no session_id / server verification (pre-existing —
	// this URL isn't gated, so a direct visit, bot, or refresh can fire it too), so
	// this can't cryptographically confirm a real purchase. Guarding sessionStorage
	// only stops the common refresh-double-counts case. A real fix needs a
	// session_id in success_url (stripe.ts) + a server-verified event (Stripe
	// webhook, or a +page.server.ts load checking payment_status) — flagged as a
	// CRO/data-integrity item, not implemented here (checkout-flow change, not
	// tracking instrumentation).
	onMount(() => {
		if (sessionStorage.getItem('sfw:purchase-tracked')) return
		sessionStorage.setItem('sfw:purchase-tracked', '1')
		track('purchase')
	})
</script>

<section class="relative flex h-screen items-center justify-center">
	<img
		class="absolute inset-0 mx-auto object-contain opacity-5"
		src={optimize(settings?.image?.asset?.url, { w: 1200 })}
		alt=""
		loading="lazy"
		decoding="async"
	/>
	<div class="relative z-0 mb-20 max-w-4xl">
		<h1 class="mb-5 text-4xl">Thanks for your order!</h1>
		<a
			class="font-display hover:border-primary hover:bg-primary hover:text-dark flex w-full items-center justify-center border p-4 text-lg text-white opacity-90 transition-all duration-300 hover:font-bold"
			href="/">visit homepage</a
		>
	</div>
</section>
