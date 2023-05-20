<script>
	export let endpoint = '/api/subscribe'
	export let darkMode = false

	import { fly } from 'svelte/transition'
	import { createForm } from 'svelte-forms-lib'
	$: isSubmitted = false
	$: message = ''
	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		onSubmit: async (values) => {
			try {
				await fetch(endpoint, {
					method: 'POST',
					body: JSON.stringify({ email: $form.email })
				})

				message = 'Thanks for subscribing!'

				// const json = await response.json()
				isSubmitted = true
				setTimeout(() => {
					$form.email = ''
					isSubmitted = false
				}, 3000)
			} catch (error) {
				message = 'Error: please try again or contact support'
				console.error(error)
			}
		}
	})
</script>

<form
	class="relative flex w-full flex-grow flex-col justify-start lg:flex-row lg:gap-0"
	on:submit|preventDefault={handleSubmit}
>
	<label for="email">
		<input
			type="email"
			name="email"
			id="email"
			placeholder="enter email"
			class={` bg-dark placeholder:text-light focus:border-light focus:placeholder:text-light/60 w-full rounded-none border-2
				p-5 text-white focus:outline-none ${darkMode ? 'border-dark' : 'border-primary'}`}
			on:change={handleChange}
			bind:value={$form.email}
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
