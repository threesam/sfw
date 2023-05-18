<script>
	export let endpoint = '/subscribe.js'
	import { slide } from 'svelte/transition'
	import { createForm } from 'svelte-forms-lib'
	$: isSubmitted = false
	$: message = ''
	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					body: JSON.stringify({ email: values.email })
				})
				console.log('response', response)
				if (response.status == 400) {
					message = 'Already Subscribed!'
				}
				if (response.status == 200) {
					message = 'Thanks for Subscribing!'
				}

				message = 'This absolutely does not work yet'

				// const json = await response.json()
				isSubmitted = true
				setTimeout(() => {
					$form.email = ''
					isSubmitted = false
				}, 3000)
			} catch (error) {
				console.error(error)
			}
		}
	})
</script>

<form
	class="flex w-full flex-grow flex-col justify-start lg:flex-row lg:gap-0"
	action={endpoint}
	method="post"
	on:submit|preventDefault={handleSubmit}
>
	<label for="email">
		<input
			type="email"
			name="email"
			id="email"
			placeholder="enter email"
			class="border-dark bg-dark placeholder:text-light focus:border-light focus:placeholder:text-light/60 w-full rounded-none border-2
			p-5 text-white focus:outline-none"
			on:change={handleChange}
			bind:value={$form.email}
		/>
	</label>
	<button
		class="border-light bg-light text-dark rounded-none border-2 p-5 lg:border-none lg:pl-5"
		type="submit"
	>
		subscribe
	</button>
</form>
{#if isSubmitted}
	<h5 transition:slide>{message}</h5>
{/if}
