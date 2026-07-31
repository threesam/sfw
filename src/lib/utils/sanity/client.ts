import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { env } from '$env/dynamic/public'
import type { Project, SiteSettings } from '$types'

const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  // Read path for every visitor request. The live API is metered and starts
  // returning 402 once the plan's request quota is hit, which took this site
  // down; the CDN has its own far larger allowance. Published content only,
  // no token, so the CDN is the right endpoint here.
  useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source: string) {
  return builder.image(source)
}

export async function getProject({ handle }: { handle: string }): Promise<Project | null> {
  return await client.fetch<Project | null>(
    `*[_type == "project" && slug.current == $handle][0]{
      ...,
      title,
      description,
      body,
      status,
      "image": {
        "src": image.asset->url,
        "alt": image.alt,
        "caption": image.caption,
        "color": image.asset->metadata.palette.lightVibrant.background,
      },
      "links": links[]{
        title,
        href
      },
      "color": image.asset->metadata.palette.lightVibrant.background,
      "cast": cast[]{
        castname,
        "name": person->name,
        "link": person->link
      },
      "crew": crew[]{
        "role": role->title,
        "name": person->name,
        "link": person->link
      },
      "posters": posters[]{
        "src": asset->url,
        "alt": alt,
        "caption": caption,
      }
    }`,
    {
      handle
    }
  )
}

export async function getAllProjects(): Promise<Project[]> {
  return await client.fetch<Project[]>(`*[_type == "project"]{
    ...,
    title,
    description,
    status,
    "slug": slug.current,
    "image": {
      "src": image.asset->url,
      "alt": image.alt,
      "caption": image.caption,
      "color": image.asset->metadata.palette.lightVibrant.background,
    },
    "posters": posters[].asset->
  }`)
}

export async function getSettings({
  hostname
}: {
  hostname: string
}): Promise<SiteSettings | null> {
  return await client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings" && hostname == $hostname][0]{
      ...,
      "links": links[]{
        title,
        href
      },
      image{
        asset->
      },
      "icons": icons[].asset->{
        "src": url,
        alt,
        caption
      },
      founders[]->{
        ...,
        image{
          asset->
        }
      }
    }`,
    {
      hostname
    }
  )
}

/**
 * Map of Printful external_id -> the Sanity-hosted copy of that product's image.
 *
 * The Printful webhook already uploads every product thumbnail into Sanity
 * (createOrReplacePrintfulProduct), so these assets exist; the storefront simply
 * was not using them. Serving them from Sanity instead of files.cdn.printful.com
 * removes the site's only third-party cookie (Cloudflare's __cf_bm) and unlocks
 * Sanity's image transforms, which take a product tile from a 336KB png to a
 * 22KB webp.
 */
export async function getProductImageMap(): Promise<Record<string, string>> {
  const rows = await client.fetch<{ id: string; image: string | null }[]>(
    `*[_type == "product"]{ "id": _id, "image": variants[0].image.asset->url }`
  )
  const map: Record<string, string> = {}
  for (const row of rows ?? []) {
    if (row?.id && row.image) map[row.id] = row.image
  }
  return map
}
