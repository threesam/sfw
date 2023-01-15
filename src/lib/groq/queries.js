export const singleProject = (slug) => {
  return `*[_type == "project" && slug.current == "${slug}"][0]{
    title,
    description,
    body,
    "image": {
      "hotspot": mainImage.hotspot,
      "crop": mainImage.crop,
      "src": mainImage.asset->url,
      "alt": mainImage.alt,
      "caption": mainImage.caption,
      "color": mainImage.asset->metadata.palette.lightVibrant.background,
    },
    "links": links[]{
      title,
      href
    },
    "color": mainImage.asset->metadata.palette.lightVibrant.background,
    "cast": cast[]{
      castname,
      "name": person->name,
      "link": person->link
    },
    "crew": crew[]{
      "role": role->title,
      "name": person->name
    },
    "posters": posters[]{
      "src": asset->url,
      "alt": alt,
      "caption": caption,
    }
  }`
}

export const allProjects = `*[_type == "project"]{
  title,
  description,
  "slug": slug.current,
  "image": {
    "hotspot": mainImage.hotspot,
    "crop": mainImage.crop,
    "src": mainImage.asset->url,
    "alt": mainImage.alt,
    "caption": mainImage.caption,
    "color": mainImage.asset->metadata.palette.lightVibrant.background,
  }
}`

export const siteSettings = (hostname) => {
  return `*[_type == "siteSettings" && hostname == "${hostname}"][0]{
    ...,
    "links": links[]{
      title,
      href
    },
    "src": image.asset->url,
    "alt": image.alt,
    "icons": icons[].asset->{
      "src": url,
      alt,
      caption
    }
  }`
}