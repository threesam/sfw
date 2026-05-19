<script lang="ts">
	import SubscribeForm from './SubscribeForm.svelte'
	import SocialLinks from './SocialLinks.svelte'
	import { page } from '$app/stores'
	import type { LayoutData } from '../../routes/$types'

	let { data }: { data: LayoutData } = $props()

	let settings = $derived(data.body.settings)
	let route = $derived($page?.route?.id || '')
</script>

{#if route !== '/contact'}
	<footer
		class="bg-primary flex flex-col items-center justify-between gap-5 p-5 lg:flex-row lg:gap-10 lg:p-10"
	>
		<SubscribeForm darkMode />
		<SocialLinks links={settings?.links ?? []} size={69} />
	</footer>
{/if}
