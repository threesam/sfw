import { error } from '@sveltejs/kit'
import { getProducts } from '$utils/printful'
import { attachSanityImages } from '$utils/products'

export async function load() {
  const products = await attachSanityImages(await getProducts())

  if (products) {
    return {
      body: {
        products
      }
    }
  }

  throw error(404)
}
