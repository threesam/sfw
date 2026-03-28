<script>
	let { links = [] } = $props()

	import { fly } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	import { page } from '$app/stores'
	import { showMenu } from '$store'

	let currentRoute = $derived($page.url.pathname)

	let clientHeight = $state(0)
</script>

<!-- OVERLAY -->
<button
	onclick={(e) => {
		if (e.target === e.currentTarget) $showMenu = false
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
						onclick={() => {
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
