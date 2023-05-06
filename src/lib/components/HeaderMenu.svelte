<script>
	export let tabs = []

	import { fly } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	import { page } from '$app/stores'
	import { showMenu, collectionHandles } from '$store'

	$: currentRoute = $page.url.pathname

	let clientHeight
</script>

<!-- OVERLAY -->
<button
	on:click|self={() => {
		$showMenu = false
	}}
	class="absolute inset-0 top-24 z-50 flex min-h-screen w-full justify-end overflow-hidden bg-black/50 lg:hidden"
>
	<!-- MENU -->
	<div
		bind:clientHeight
		in:fly={{ y: -clientHeight, opacity: 100, duration: 400, easing: quintInOut }}
		class="z-30 w-full bg-white p-5 md:w-1/2 lg:w-1/3"
	>
		<div class="flex w-full flex-col items-start gap-5 py-5">
			{#each tabs as tab, i (tab.name)}
				<div>
					<button
						class:active={currentRoute === tab.path}
						on:click={() => {
							$showMenu = false
						}}
					>
						<a
							href={tab.path}
							class={`font-display rounded-lg text-2xl font-bold text-black hover:opacity-100 ${
								currentRoute === tab.path ? 'opacity-100' : 'opacity-75'
							}`}>{tab.name}</a
						>
					</button>
				</div>
			{/each}
		</div>
	</div>
</button>
