<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import ProductDetail from '$lib/components/ProductDetail.svelte'
  import JsonLd from '$lib/components/JsonLd.svelte'
  import SEO from 'svelte-seo'
  import { canonical } from '$lib/utils/site'

  let { data }: { data: PageData } = $props()

  const { product } = data.body
  const { variants } = product

  // This page still exists and still server-renders: it is what a shared link, a
  // reload, or a crawler gets. In-app tile clicks open the sheet over the grid
  // instead, via shallow routing, and both end up on the same URL.
  let initialVariantId = $derived(new URL($page.url).searchParams.get('v'))

  // Mirror the choice into ?v= so a variant stays shareable. replaceState so
  // picking sizes does not stack history entries the back button has to unwind.
  function onvariantchange(id: number | string) {
    goto(`?v=${id}`, { replaceState: true, noScroll: true, keepFocus: true })
  }

  let productLd = $derived.by(() => {
    const pageUrl = canonical($page.url.pathname)
    const offers = variants
      .map((v) => {
        const price = Number(v.retail_price)
        if (!Number.isFinite(price)) return null
        return {
          '@type': 'Offer' as const,
          sku: v.sku,
          price,
          priceCurrency: v.currency ?? 'USD',
          availability: 'https://schema.org/InStock',
          url: `${pageUrl}?v=${v.id}`
        }
      })
      .filter((o): o is NonNullable<typeof o> => o !== null)
    return {
      '@type': 'Product',
      name: product.name,
      description: `${product.name}. Limited apparel from Skeleton Flowers and Water.`,
      image: product.thumbnail_url,
      brand: { '@type': 'Brand', name: 'Skeleton Flowers and Water' },
      category: 'Apparel',
      offers
    }
  })
</script>

<SEO
  title={`${product.name} - Skeleton Flowers and Water`}
  description={`${product.name}. Limited apparel from Skeleton Flowers and Water.`}
  openGraph={{
    title: product.name,
    type: 'website',
    images: product.thumbnail_url ? [{ url: product.thumbnail_url }] : []
  }}
/>

<JsonLd data={productLd} />

<section class="mx-auto max-w-7xl p-5">
  <ProductDetail {product} {initialVariantId} {onvariantchange} headingLevel={1} />
</section>
