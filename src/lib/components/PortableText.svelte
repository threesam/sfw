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
				padding-bottom: 0.5rem;
				font-weight: 800;
			}
			p {
				padding-bottom: 1rem;
			}

			a {
				@apply text-gray-700 underline underline-offset-4;

				&:hover {
					@apply text-dark underline-offset-2 transition-all;
				}
			}
		}
	}
</style>
