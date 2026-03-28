<script>
	let { endpoint = '/api/subscribe', darkMode = false } = $props()

	import { fly } from 'svelte/transition'

	let isSubmitted = $state(false)
	let message = $state('')
	let email = $state('')

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			await fetch(endpoint, {
				method: 'POST',
				body: JSON.stringify({ email })
			})

			message = 'Thanks for subscribing!'
			isSubmitted = true
			setTimeout(() => {
				email = ''
				isSubmitted = false
			}, 3000)
		} catch (error) {
			message = 'Error: please try again or contact support'
			console.error(error)
		}
	}
</script>

<form
	class="relative flex w-full flex-grow flex-col justify-start lg:flex-row lg:gap-0"
	onsubmit={handleSubmit}
>
	<label for="email">
		<input
			type="email"
			name="email"
			id="email"
			placeholder="enter email"
			class={` bg-dark placeholder:text-light focus:border-light focus:placeholder:text-light/60 w-full rounded-none border-2
				p-5 text-white focus:outline-none ${darkMode ? 'border-dark' : 'border-primary'}`}
			bind:value={email}
		/>
	</label>
	<button
		class={`bg-primary text-dark rounded-none border-2 p-5 lg:pl-5 ${
			darkMode ? 'border-dark' : 'border-primary'
		}`}
		type="submit"
	>
		subscribe
	</button>
	{#if isSubmitted}
		<p
			class={`absolute -bottom-6 left-0 ${darkMode ? 'text-dark' : 'text-light'}`}
			in:fly={{ x: -30 }}
			out:fly={{ x: 30 }}
		>
			{message}
		</p>
	{/if}
</form>
