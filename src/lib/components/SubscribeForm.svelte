<script lang="ts">
	import { fly } from 'svelte/transition'
	import { track } from '$lib/utils/umami'
	import { HONEYPOT_FIELD } from '$lib/honeypot'

	let {
		endpoint = '/api/subscribe',
		darkMode = false,
		location = undefined,
	}: { endpoint?: string; darkMode?: boolean; location?: string } = $props()

	let email = $state('')
	let status = $state<'idle' | 'submitting' | 'ok' | 'error'>('idle')
	let message = $state('')

	async function submit(e: SubmitEvent) {
		e.preventDefault()
		if (status === 'submitting') return
		status = 'submitting'
		// The honeypot is read off the DOM at submit time rather than through
		// bind:value. `bind:` only updates on an input event, and a filler that
		// assigns `.value` directly — which is exactly what the cheap ones do —
		// never fires one, so the bound copy would still read empty and the trap
		// would pass it straight through.
		const honeypot = String(
			new FormData(e.currentTarget as HTMLFormElement).get(HONEYPOT_FIELD) ?? ''
		)
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, [HONEYPOT_FIELD]: honeypot }),
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
			// Names the recovery, because one of the server's refusals is "this page
			// predates the current deploy" and a refresh is the whole fix for it.
			message = 'Something went wrong. Refresh and try again.'
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
		referral code
		<input type="text" name={HONEYPOT_FIELD} tabindex="-1" autocomplete="off" />
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
