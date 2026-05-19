import type { ProjectStatus } from '$types'

export const STATUS_LABEL: Record<ProjectStatus, string> = {
	'pre-production': 'Pre-Production',
	filming: 'Filming',
	'post-production': 'Post-Production',
	completed: 'Completed',
	released: 'Released',
}

export function formatStatus(status: string | undefined): string {
	if (!status) return ''
	return STATUS_LABEL[status as ProjectStatus] ?? status.replace(/-/g, ' ')
}

// Genre phrases that recur in Sanity project descriptions. Until Sanity gains
// an explicit `genres` field, surface structured genre data heuristically.
const GENRE_PATTERNS: RegExp[] = [
	/dark comedy horror/gi,
	/rom-com\/horror/gi,
	/supernatural horror/gi,
	/neo-noir/gi,
	/period drama\/horror/gi,
	/romance thriller/gi,
	/romance drama/gi,
	/(?:college|high school) comedy\/drama/gi,
	/dramatic short/gi,
	/\b(?:horror|drama|comedy|romance|mystery|fantasy|thriller)\b/gi,
]

export function extractGenres(text: string | undefined): string[] {
	if (!text) return []
	const found = new Set<string>()
	for (const re of GENRE_PATTERNS) {
		for (const m of text.matchAll(re)) {
			const v = m[0].trim()
			if (v) found.add(v.charAt(0).toUpperCase() + v.slice(1).toLowerCase())
		}
	}
	return [...found]
}
