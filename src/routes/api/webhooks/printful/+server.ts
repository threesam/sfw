import { deleteProduct, upsertProduct } from '$utils/stripe.js'
import { sendOrderCreatedNotification, sendPackageShippedNotification } from '$utils/sendgrid'
import { getProduct } from '$utils/printful.js'
import { json } from '@sveltejs/kit'
import type { PrintfulWebhook } from '$types'
import { createOrReplacePrintfulProduct } from '$utils/sanity'

export async function POST({ request }: { request: Request }) {
  const { data, type }: PrintfulWebhook = await request.json()

  if (type === 'order_created') {
    const res = await sendOrderCreatedNotification({
      order: data.order
    })

    return json({
      res
    })
  }

  if (type === 'package_shipped') {
    const res = await sendPackageShippedNotification({
      order: data.order,
      shipment: data.shipment
    })

    return json({
      res
    })
  }

  if (type === 'product_updated') {
    const product = await getProduct({
      id: data.sync_product.id
    })

    let sanityRes
    let stripeRes

    try {
      sanityRes = await createOrReplacePrintfulProduct({ product })
    } catch (error) {
      console.error('error: ', error)
      sanityRes = error
    }

    try {
      stripeRes = await upsertProduct({ product })
    } catch (error) {
      console.error('error: ', error)
      stripeRes = error
    }

    return json({
      res: {
        sanity: sanityRes,
        stripe: stripeRes
      }
    })
  }

  if (type === 'product_deleted') {
    const res = await deleteProduct({ id: data.sync_product.external_id })

    return json({
      res
    })
  }

  return new Response('Unsupported webhook')
}
