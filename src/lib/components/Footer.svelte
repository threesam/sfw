<script lang="ts">
	import SubscribeForm from './SubscribeForm.svelte'
	import SocialLinks from './SocialLinks.svelte'

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
</script>

<footer
	class="flex flex-col-reverse items-center justify-between gap-10 bg-primary p-10 lg:flex-row"
>
	<SocialLinks links={settings.links} size={69} />
	<SubscribeForm />
</footer>
