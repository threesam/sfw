import { getProducts } from '$utils/printful'
import { attachSanityImages } from '$utils/products'
import { getAllProjects } from '$utils/sanity/client'
import { error } from '@sveltejs/kit'

export async function load() {
  const projects = await getAllProjects()
  const products = await attachSanityImages(await getProducts())

  if (projects && products) {
    return {
      body: {
        projects,
        products
      }
    }
  }

  throw error(404)
}
