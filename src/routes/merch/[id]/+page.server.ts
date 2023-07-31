import { error } from '@sveltejs/kit'
import { getProduct } from '$utils/printful'
import type { RouteParams } from './$types'

export async function load({ params }: { params: RouteParams }) {
  const { id } = params
  const product = await getProduct({ id })

  if (product) {
    return {
      body: {
        product
      }
    }
  }

  throw error(404)
}
