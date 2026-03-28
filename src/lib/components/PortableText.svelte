<script lang="ts">
	export let blocks: any[] = []
	import { PortableText } from '@portabletext/svelte'
</script>

<section class="portable-text mx-auto max-w-2xl p-5">
	<PortableText value={blocks} />
</section>

<style lang="scss">
	:global(.portable-text) {
		:global(h1),
		:global(h2),
		:global(h3),
		:global(h4),
		:global(h5) {
			@apply pb-3 font-thin;
		}
		:global(p) {
			@apply pb-5;
		}

		:global(a) {
			@apply text-light border-b border-primary;

			&:hover {
				@apply text-primary border-transparent;
			}
		}
	}
</style>
