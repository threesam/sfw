<script lang="ts">
	import { fly } from 'svelte/transition'
	import { track } from '$lib/utils/umami'

	let {
		endpoint = '/api/subscribe',
		darkMode = false,
		location = undefined,
	}: { endpoint?: string; darkMode?: boolean; location?: string } = $props()

	let email = $state('')
	let status = $state<'idle' | 'submitting' | 'ok' | 'error'>('idle')
	let message = $state('')

	// Honeypot. Hidden from people, filled by anything walking the DOM.
	let company = $state('')

	// Set when the component initialises in the browser, so what the server
	// receives is an elapsed COUNT rather than a start time — see the note in
	// subscribe-guard.ts on why comparing browser clocks to the server's
	// silently drops visitors whose clock runs fast.
	const mountedAt = Date.now()

	async function submit(e: SubmitEvent) {
		e.preventDefault()
		if (status === 'submitting') return
		status = 'submitting'
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, company, elapsedMs: Date.now() - mountedAt }),
			})
			if (!res.ok) throw new Error(String(res.status))
			status = 'ok'
			message = 'Thanks for subscribing!'
			track('newsletter-subscribe')
			setTimeout(() => {
				email = ''
				status = 'idle'
				message = ''
			}, 3000)
		} catch (err) {
			console.error(err)
			status = 'error'
			message = 'Something went wrong. Try again later.'
		}
	}
</script>

<form
	class="relative flex w-full flex-grow flex-col justify-start lg:flex-row lg:gap-0"
	onsubmit={submit}
>
	<!--
		Honeypot. Positioned off-screen rather than `display: none` or `hidden`,
		because the cheap bots skip anything trivially detectable as hidden and
		the whole point is that they fill it in. The input is WRAPPED by its
		label rather than wired with for/id: this component already renders
		twice on the home page, so every id in here is a duplicate in the DOM,
		and wrapping needs no id at all. aria-hidden and tabindex="-1" keep it
		out of the tab order and off screen readers; autocomplete="off" stops a
		browser filling it for a real person, which would silently drop them.
	-->
	<label
		aria-hidden="true"
		class="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
	>
		company
		<input type="text" name="company" bind:value={company} tabindex="-1" autocomplete="off" />
	</label>
	<label for="email">
		<input
			type="email"
			name="email"
			id="email"
			required
			placeholder="enter email"
			bind:value={email}
			disabled={status === 'submitting'}
			class={`bg-dark placeholder:text-light focus:border-light focus:placeholder:text-light/60 w-full rounded-none border-2 p-5 text-white focus:outline-none ${
				darkMode ? 'border-dark' : 'border-primary'
			}`}
		/>
	</label>
	<button
		type="submit"
		disabled={status === 'submitting'}
		data-umami-event="subscribe-click"
		data-umami-event-location={location}
		class={`bg-primary text-dark rounded-none border-2 p-5 lg:pl-5 disabled:opacity-60 ${
			darkMode ? 'border-dark' : 'border-primary'
		}`}
	>
		{status === 'submitting' ? '…' : 'subscribe'}
	</button>
	{#if message}
		<p
			class={`absolute -bottom-6 left-0 ${darkMode ? 'text-dark' : 'text-light'}`}
			in:fly={{ x: -30 }}
			out:fly={{ x: 30 }}
		>
			{message}
		</p>
	{/if}
</form>
