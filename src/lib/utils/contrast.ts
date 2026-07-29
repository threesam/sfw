/**
 * Poster-derived accent colors, made safe to set type in.
 *
 * Sanity hands us `metadata.palette.dominant.background` off each poster, and the
 * banner sets the film title in it against the near-black page. Nothing bounds
 * that value, so a dark or muted poster produces a title that is effectively
 * unreadable. Rather than discard the color and fall back to plain white, we
 * lift it toward its own hue until it clears the contrast floor, so the brand
 * idea survives and the text stays legible.
 */

const PAGE_DARK = '#111111'
/** WCAG AA for body text. Deliberately stricter than the 3:1 large-text floor,
 *  because the same value is reused at smaller sizes elsewhere. */
const MIN_RATIO = 4.5

function parseHex(hex: string): [number, number, number] | null {
	const h = hex.trim().replace(/^#/, '')
	const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
	return [
		parseInt(full.slice(0, 2), 16),
		parseInt(full.slice(2, 4), 16),
		parseInt(full.slice(4, 6), 16),
	]
}

/** WCAG relative luminance. */
function luminance([r, g, b]: [number, number, number]): number {
	const f = (v: number) => {
		const c = v / 255
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
	}
	return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function ratio(a: [number, number, number], b: [number, number, number]): number {
	const la = luminance(a)
	const lb = luminance(b)
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const toHex = (rgb: [number, number, number]) =>
	'#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

/**
 * Return `color` if it already reads against `bg`, otherwise the same hue lifted
 * toward white until it does. Falls back to white for unparseable input.
 */
export function readableOn(color: string | undefined | null, bg = PAGE_DARK): string {
	const fg = color ? parseHex(color) : null
	const ground = parseHex(bg)
	if (!fg || !ground) return '#ffffff'
	if (ratio(fg, ground) >= MIN_RATIO) return color as string

	// Blend toward white in fixed steps. 20 steps is finer than the eye resolves
	// across this range, and terminating at pure white is always a valid answer
	// since white maximises contrast against any ground dark enough to fail.
	for (let i = 1; i <= 20; i++) {
		const t = i / 20
		const lifted: [number, number, number] = [
			fg[0] + (255 - fg[0]) * t,
			fg[1] + (255 - fg[1]) * t,
			fg[2] + (255 - fg[2]) * t,
		]
		if (ratio(lifted, ground) >= MIN_RATIO) return toHex(lifted)
	}
	return '#ffffff'
}
