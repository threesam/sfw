import { describe, it, expect } from 'vitest'
import { readableOn } from './contrast'

const MIN = 4.5

function parseHex(hex: string): [number, number, number] {
  const h = hex.trim().replace(/^#/, '')
  const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16)
  ]
}

function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const f = (v: number) => {
      const c = v / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }
    const [r, g, bl] = parseHex(hex)
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl)
  }
  const la = lum(a)
  const lb = lum(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const grey = (v: number) => '#' + v.toString(16).padStart(2, '0').repeat(3)

describe('readableOn', () => {
  it('passes through a colour that already clears the floor', () => {
    // The current featured poster. Must not be altered.
    expect(readableOn('#bebdbb', '#111111')).toBe('#bebdbb')
  })

  it('lifts a too-dark colour on the dark page instead of discarding it', () => {
    const out = readableOn('#1a1a1a', '#111111')
    expect(out).not.toBe('#1a1a1a')
    expect(contrast(out, '#111111')).toBeGreaterThanOrEqual(MIN)
  })

  it('darkens rather than lightens on a light ground', () => {
    // Regression: an earlier version always blended toward white, so on a light
    // ground it returned #ffffff - the least readable answer available.
    const out = readableOn('#ffffff', '#fcfcfc')
    expect(contrast(out, '#fcfcfc')).toBeGreaterThanOrEqual(MIN)
  })

  it('falls back to a readable pole for missing or malformed input', () => {
    expect(contrast(readableOn(null, '#111111'), '#111111')).toBeGreaterThanOrEqual(MIN)
    expect(contrast(readableOn('not-a-colour', '#111111'), '#111111')).toBeGreaterThanOrEqual(MIN)
    expect(contrast(readableOn(undefined, '#fcfcfc'), '#fcfcfc')).toBeGreaterThanOrEqual(MIN)
  })

  it('holds the floor against every grey ground', () => {
    // Exhaustive rather than sampled: two earlier bugs lived in narrow bands a
    // hand-picked list missed. One chose the blend direction from a luminance
    // threshold instead of measured contrast; the other measured the unrounded
    // colour and rounded on the way out, shedding just enough to land at 4.48.
    const inputs = ['#808080', '#ff0000', '#00ff00', '#0000ff', null]
    const failures: string[] = []
    for (let v = 0; v <= 255; v++) {
      const bg = grey(v)
      for (const input of [...inputs, bg]) {
        const out = readableOn(input, bg)
        const ratio = contrast(out, bg)
        if (ratio < MIN) failures.push(`${input} on ${bg} -> ${out} (${ratio.toFixed(3)}:1)`)
      }
    }
    expect(failures).toEqual([])
  })
})
