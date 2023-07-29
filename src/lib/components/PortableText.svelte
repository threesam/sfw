<script lang="ts">
	export let blocks: any[] = []
	import { PortableText } from '@portabletext/svelte'
</script>

<section class="portable-text mx-auto max-w-2xl p-5">
	<PortableText value={blocks} />
</section>

<style lang="scss">
	:global {
		.portable-text {
			h1,
			h2,
			h3,
			h4,
			h5 {
				@apply pb-3 font-thin;
			}
			p {
				@apply pb-5;
			}

			a {
				@apply text-light border-b border-primary;

				&:hover {
					@apply text-primary border-transparent;
				}
			}
		}
	}
</style>
