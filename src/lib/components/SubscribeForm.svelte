<script>
	import { slide } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	$: isSubmitted = false;
	$: message = '';
	const { form, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		onSubmit: async (values) => {
			try {
				const response = await fetch('/api/subscribe', {
					method: 'POST',
					body: JSON.stringify({ email: values.email })
				});
				console.log('response', response);
				if (response.status == 400) {
					message = 'Already Subscribed!';
				}
				if (response.status == 200) {
					message = 'Thanks for Subscribing!';
				}
				// const json = await response.json()
				isSubmitted = true;
				setTimeout(() => {
					$form.email = '';
					isSubmitted = false;
				}, 3000);
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<div class="subscribe-form">
	<!-- <h4>Grab our updates</h4> -->
	<form action="/api/subscribe" method="post" on:submit|preventDefault={handleSubmit}>
		<label for="email">
			<input
				type="email"
				name="email"
				id="email"
				placeholder="enter email"
				on:change={handleChange}
				bind:value={$form.email}
			/>
		</label>
		<button type="submit">subscribe</button>
	</form>
	{#if isSubmitted}
		<h5 transition:slide>{message}</h5>
	{/if}
</div>

<style>
	/* section {
		max-width: 100%;
		display: grid;
		place-content: center;
		gap: 2rem;
		position: relative;
		background-color: lavender;
		color: var(--background);
		padding: 4rem 2rem;
	} */
	.subscribe-form {
		max-width: 50rem;
		/* border: 2px solid var(--background); */
		--width: 65%;
	}
	form {
		display: flex;
		margin: 0;
		padding: 0;
		min-width: 100%;
		justify-content: stretch;
	}
	label {
		width: var(--width);
	}
	input {
		height: 100%;
		border: 0.125rem solid var(--background);
		font-size: 1rem;
		border-radius: 0;
		background: var(--background);
		color: var(--textColor);
		padding: 0.28rem 1rem;
	}
	/* magic number to match svg search icon */
	input:focus {
		border: 0.125rem solid transparent;
		outline: none;
	}
	button {
		background-color: var(--textColor);
		font-family: var(--headingFont);
		padding: 1rem 1.5rem;
		border-radius: 0;
		width: calc(100% - var(--width));
		text-align: center;
	}
	h4,
	h5 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: var(--background);
	}
	@media screen and (max-width: 600px) {
		h3 {
			font-size: var(--h4);
		}
	}
</style>
