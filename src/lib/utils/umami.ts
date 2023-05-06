import { getId } from './helpers'

export function trackCart({
	product,
	variant,
	type
}: {
	product?: any
	variant: any
	type: 'add-to-cart' | 'remove-from-cart'
}) {
	if (window?.umami) {
		window.umami.track(type, {
			category: product?.productType ?? '',
			id: getId(product?.id) ?? '',
			// imageURL: product?.images.edges[0].node.originalSrc ?? '',
			name: product?.title ?? '',
			price: Number(variant.node.priceV2?.amount) ?? '',
			// sku: variant.node.sku ?? '',
			// variant: variant.node.title ?? '',
			variant_id: getId(variant.node.merchandise?.id ?? variant.node.id) ?? ''
		})
	}
}
