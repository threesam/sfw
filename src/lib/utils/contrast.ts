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
 * Return `color` if it already reads against `bg`, otherwise the same hue pushed
 * away from `bg` until it does. Falls back to whichever pole contrasts with `bg`
 * for unparseable input.
 *
 * The direction is chosen from the background, not assumed: lightening toward
 * white is right against this site's near-black page, but against a light ground
 * it would make contrast worse and hand back the least readable answer possible.
 */
export function readableOn(color: string | undefined | null, bg = PAGE_DARK): string {
	const ground = parseHex(bg)
	if (!ground) return '#ffffff'

	// Pick the pole by measured contrast rather than a luminance threshold. White
	// only reaches the floor when the ground's luminance is <= ~0.183, so a naive
	// "is it darker than mid-grey" test sends mid-dark grounds toward white and
	// terminates at a #ffffff that still fails. The two poles' ranges overlap
	// (white works <= 0.183, black works >= 0.175), so whichever measures higher
	// is always a terminal answer that clears the floor.
	const white: [number, number, number] = [255, 255, 255]
	const black: [number, number, number] = [0, 0, 0]
	const towardWhite = ratio(white, ground) >= ratio(black, ground)
	const pole = towardWhite ? 255 : 0
	const fallback = towardWhite ? '#ffffff' : '#000000'

	const fg = color ? parseHex(color) : null
	if (!fg) return fallback
	if (ratio(fg, ground) >= MIN_RATIO) return color as string

	// 20 steps is finer than the eye resolves across this range. Round to the
	// 8-bit channel value BEFORE measuring: checking the unrounded float and then
	// rounding on the way out can shed enough contrast to land just under the
	// floor, which an exhaustive sweep of grey grounds put at 4.48:1.
	for (let i = 1; i <= 20; i++) {
		const t = i / 20
		const shifted: [number, number, number] = [
			Math.round(fg[0] + (pole - fg[0]) * t),
			Math.round(fg[1] + (pole - fg[1]) * t),
			Math.round(fg[2] + (pole - fg[2]) * t),
		]
		if (ratio(shifted, ground) >= MIN_RATIO) return toHex(shifted)
	}
	return fallback
}
