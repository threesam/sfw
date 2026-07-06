<script lang="ts">
	import { fly } from 'svelte/transition'
	import { track } from '$lib/utils/umami'

	let {
		endpoint = '/api/subscribe',
		darkMode = false,
	}: { endpoint?: string; darkMode?: boolean } = $props()

	let email = $state('')
	let status = $state<'idle' | 'submitting' | 'ok' | 'error'>('idle')
	let message = $state('')

	async function submit(e: SubmitEvent) {
		e.preventDefault()
		if (status === 'submitting') return
		status = 'submitting'
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email }),
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
			message = 'Something went wrong — try again later.'
		}
	}
</script>

<form
	class="relative flex w-full flex-grow flex-col justify-start lg:flex-row lg:gap-0"
	onsubmit={submit}
>
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
