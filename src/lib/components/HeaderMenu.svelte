<script lang="ts">
	import { fly } from 'svelte/transition'
	import { quintInOut } from 'svelte/easing'
	import { page } from '$app/stores'
	import { showMenu } from '$store'
	import type { ProjectLink } from '$types'

	let { links = [] as ProjectLink[] }: { links?: ProjectLink[] } = $props()

	let currentRoute = $derived($page.url.pathname)
	let clientHeight = $state(0)

	function closeMenu() {
		$showMenu = false
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closeMenu()
	}

	function handleKey(event: KeyboardEvent) {
		if (event.key === 'Escape') closeMenu()
	}
</script>

<svelte:window onkeydown={handleKey} />

<!-- OVERLAY: click-outside is a mouse convenience; keyboard closes with Escape or the toggle.
     Not role="button" — a button wrapping the nav links hides them from assistive tech. -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
	id="mobile-menu"
	onclick={handleOverlayClick}
	class="bg-dark/90 absolute inset-0 top-16 z-50 flex min-h-screen w-full justify-end overflow-hidden lg:hidden"
>
	<!-- MENU -->
	<nav
		aria-label="main"
		bind:clientHeight
		in:fly={{ y: -clientHeight, opacity: 100, duration: 400, easing: quintInOut }}
		class="bg-dark z-30 w-full sm:w-max"
	>
		<div class="bg-primary flex w-full flex-col items-start gap-5 p-5 sm:items-end">
			{#each links as link (link.title)}
				<a
					href={link.href}
					onclick={closeMenu}
					class:active={currentRoute === link.href}
					class={`font-display rounded-lg text-2xl font-thin text-black hover:opacity-100 ${
						currentRoute === link.href ? 'opacity-100' : 'opacity-75'
					}`}>{link.title}</a
				>
			{/each}
		</div>
	</nav>
</div>
