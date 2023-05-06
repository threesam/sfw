<script lang="ts">
	import SubscribeForm from './SubscribeForm.svelte'
	import SocialLinks from './SocialLinks.svelte'
	import { page } from '$app/stores'

	export let data = {} as {
		body: {
			settings: {
				links: {
					title: string
					href: string
				}[]
			}
		}
	}

	const { settings } = data.body

	$: route = $page?.route?.id || ''
</script>

{#if route !== '/contact'}
	<footer class="bg-primary flex flex-col items-center justify-between gap-10 p-10 lg:flex-row">
		<SubscribeForm />
		<SocialLinks links={settings.links} size={69} />
	</footer>
{/if}
