import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { env } from '$env/dynamic/public'

const client = createClient({
	projectId: env.SANITY_PROJECT_ID,
	dataset: env.SANITY_DATASET,
	apiVersion: '2021-10-21',
	useCdn: false
})

const builder = imageUrlBuilder(client)

export function urlFor(source: string) {
	return builder.image(source)
}

export async function getProject({ handle }: { handle: string }) {
	return await client.fetch(
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

export async function getAllProjects() {
	return await client.fetch(`*[_type == "project"]{
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

export async function getSettings({ hostname }: { hostname: string }) {
	return await client.fetch(
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
