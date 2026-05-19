<script lang="ts">
	import { fly } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	import { page } from '$app/stores'
	import { showMenu } from '$store'
	import type { ProjectLink } from '$types'

	export let links: ProjectLink[] = []

	$: currentRoute = $page.url.pathname

	let clientHeight = 0

	function closeMenu() {
		$showMenu = false
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closeMenu()
	}

	function handleOverlayKey(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			closeMenu()
		}
	}
</script>

<!-- OVERLAY -->
<div
	role="button"
	tabindex="0"
	on:click={handleOverlayClick}
	on:keydown={handleOverlayKey}
	class="bg-dark/90 absolute inset-0 top-16 z-50 flex min-h-screen w-full justify-end overflow-hidden lg:hidden"
>
	<!-- MENU -->
	<div
		bind:clientHeight
		in:fly={{ y: -clientHeight, opacity: 100, duration: 400, easing: quintInOut }}
		class="bg-dark z-30 w-full sm:w-max"
	>
		<div class="bg-primary flex w-full flex-col items-start gap-5 p-5 sm:items-end">
			{#each links as link (link.title)}
				<a
					href={link.href}
					on:click={closeMenu}
					class:active={currentRoute === link.href}
					class={`font-display rounded-lg text-2xl font-thin text-black hover:opacity-100 ${
						currentRoute === link.href ? 'opacity-100' : 'opacity-75'
					}`}>{link.title}</a
				>
			{/each}
		</div>
	</div>
</div>
