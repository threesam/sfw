<script>
	export let links = []

	import { fly } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	import { page } from '$app/stores'
	import { showMenu } from '$store'

	$: currentRoute = $page.url.pathname

	let clientHeight
</script>

<!-- OVERLAY -->
<button
	on:click|self={() => {
		$showMenu = false
	}}
	class="bg-dark/90 absolute inset-0 top-16 z-50 flex min-h-screen w-full justify-end overflow-hidden lg:hidden"
>
	<!-- MENU -->
	<div
		bind:clientHeight
		in:fly={{ y: -clientHeight, opacity: 100, duration: 400, easing: quintInOut }}
		class="bg-dark z-30 w-full sm:w-max"
	>
		<div class="bg-primary flex w-full flex-col items-start gap-5 p-5 sm:items-end">
			{#each links as link, i (link.title)}
				<div>
					<button
						class:active={currentRoute === link.href}
						on:click={() => {
							$showMenu = false
						}}
					>
						<a
							href={link.href}
							class={`font-display rounded-lg text-2xl font-thin text-black hover:opacity-100 ${
								currentRoute === link.href ? 'opacity-100' : 'opacity-75'
							}`}>{link.title}</a
						>
					</button>
				</div>
			{/each}
		</div>
	</div>
</button>
