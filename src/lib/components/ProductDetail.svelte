<script lang="ts">
  import { cartItems, showCart, type CartItem } from '$store'
  import { trackCart } from '$utils/umami'
  import DescriptionToggle from '$components/DescriptionToggle.svelte'
  import type { PrintfulProduct, PrintfulSyncVariant } from '$types'

  // The product body, shared by the /merch/[id] page and the sheet that opens
  // over the grid. Variant selection is LOCAL state with an optional callback,
  // deliberately: the page version used goto('?v=') to change variants, and
  // inside the sheet that would navigate and tear the sheet down. The page wires
  // the callback back to the URL so ?v= deep links still work; the sheet does not.
  let {
    product,
    initialVariantId = null,
    onvariantchange,
    headingLevel = 1,
    imageClass = 'md:w-2/3'
  }: {
    product: PrintfulProduct
    initialVariantId?: string | null
    onvariantchange?: (id: number | string) => void
    /** 1 on its own page; 2 inside the sheet, whose dialog label is the product name. */
    headingLevel?: 1 | 2
    imageClass?: string
  } = $props()

  const variants = product.variants

  let selectedId = $state(initialVariantId ?? (variants[0] ? String(variants[0].id) : null))

  let selectedVariant: (PrintfulSyncVariant & { quantity?: number }) | undefined = $derived(
    variants.find((v) => String(v.id) === String(selectedId)) ?? variants[0]
  )

  function getSize(variant: PrintfulSyncVariant) {
    const parenMatch = variant.product?.name?.match(/\(.*\/\s*(.+?)\)/)
    if (parenMatch) return parenMatch[1]
    const parts = variant.name.split(' - ')
    return parts.length > 1 ? parts[parts.length - 1] : 'one size'
  }

  function selectVariant(id: number | string) {
    selectedId = String(id)
    onvariantchange?.(id)
  }

  function addToCart({ variant }: { variant: PrintfulSyncVariant & { quantity?: number } }) {
    let isAlreadyAdded = false
    const items: CartItem[] = []
    $cartItems.forEach((item) => {
      if (variant.id === item.id) {
        isAlreadyAdded = true
        item.quantity++
      }
      items.push(item)
    })

    if (!isAlreadyAdded) {
      variant.quantity = 1
      items.push(variant as CartItem)
    }

    $cartItems = items
    $showCart = true
    trackCart({ variant, type: 'add-to-cart' })
  }
</script>

{#if product && selectedVariant}
  <div class="flex max-w-full flex-col md:flex-row">
    <img
      class="bg-gradient-to-tr from-slate-700 {imageClass}"
      src={product.thumbnail_url}
      alt="product - {product.name}"
    />

    <div class="h-full md:w-1/3 lg:pl-10">
      {#if headingLevel === 1}
        <h1 class="font-display pt-5 text-4xl">{product.name}</h1>
      {:else}
        <h2 class="font-display pt-5 text-4xl">{product.name}</h2>
      {/if}

      <p class="mb-3 text-lg">
        <b>{selectedVariant.retail_price}</b>
        {selectedVariant.currency}
      </p>

      <div class="mb-8 pt-5">
        <h4 class="mb-2 text-base font-semibold uppercase tracking-wide">Size</h4>
        <div class="flex gap-3">
          {#each variants as variant}
            <button
              onclick={() => selectVariant(variant.id)}
              aria-pressed={selectedVariant?.id === variant.id}
              class={`${
                selectedVariant?.id === variant.id
                  ? 'text-dark bg-gradient-to-tr from-slate-100 to-gray-500 font-extrabold'
                  : ''
              } flex h-12 w-24 items-center justify-center border transition duration-300 ease-in-out hover:scale-95 hover:opacity-100`}
            >
              {getSize(variant)}
            </button>
          {/each}
        </div>
      </div>

      <button
        onclick={() => {
          const v = selectedVariant ?? variants[0]
          if (v) addToCart({ variant: v })
        }}
        class="hover:bg-primary hover:text-dark hover:border-primary flex w-full items-center justify-center border p-4 text-white opacity-90 transition-all duration-300 hover:font-bold"
      >
        <span class="font-display text-lg uppercase">Add To Cart</span>
      </button>
      <p class="py-3 text-xs italic text-red-500">
        <b class="uppercase">final sale:</b> custom item not subject to returns.
      </p>
      <DescriptionToggle
        title="Shipping Details"
        description="US Orders only, shipping included for limited time."
      />
    </div>
  </div>
{/if}
