import { env } from '$env/dynamic/public'

export const SITE_URL = (env.PUBLIC_SITE_URL ?? 'https://skeletonflowersandwater.com').replace(
	/\/$/,
	'',
)

export function canonical(pathname: string): string {
	return SITE_URL + pathname
}
