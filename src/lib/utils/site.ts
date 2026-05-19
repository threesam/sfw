export const SITE_URL = 'https://skeletonflowersandwater.com'

export function canonical(pathname: string): string {
	return SITE_URL + pathname
}
