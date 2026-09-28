<script lang="ts">
	import { PortableText, type InputValue } from '@portabletext/svelte'

	let { blocks = [] as InputValue }: { blocks?: InputValue } = $props()

	type Block = { _type?: string; style?: string; children?: { text?: string }[] }

	// Sanity content can hold an empty heading block (the about page body does).
	// Rendered, it is an empty <hN> in the page outline that screen readers announce.
	let visible = $derived(
		(Array.isArray(blocks) ? blocks : [blocks]).filter((b) => {
			const block = b as Block
			if (block._type !== 'block' || !/^h[1-6]$/.test(block.style ?? '')) return true
			return block.children?.some((c) => c.text?.trim())
		}) as InputValue
	)
</script>

<section class="portable-text mx-auto max-w-2xl p-5">
	<PortableText value={visible} />
</section>

<style>
	@reference '../../app.css';

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
