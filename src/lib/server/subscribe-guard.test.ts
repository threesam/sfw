import { beforeEach, describe, expect, it } from 'vitest'
import { guardSubmission, isRateLimited, resetGuardForTests } from './subscribe-guard'

// A submission that should pass every layer. Each test below changes exactly
// one field, so a failure names the layer that rejected it.
const good = () => ({ email: 'reader@example.com', honeypot: '' })

describe('subscribe guard', () => {
  beforeEach(resetGuardForTests)

  it('passes a real submission and hands back the trimmed address', () => {
    const verdict = guardSubmission({ ...good(), email: '  reader@example.com  ' })
    expect(verdict.pass).toBe(true)
    expect(verdict).toMatchObject({ email: 'reader@example.com' })
  })

  it('rejects a missing or malformed address before listmonk sees it', () => {
    for (const email of [undefined, '', '   ', 'x', 'no-at-sign.com', 'two@@at.com', 'a@b']) {
      expect(guardSubmission({ ...good(), email })).toMatchObject({
        pass: false,
        silent: false,
        status: 400
      })
    }
  })

  it('rejects an oversized address', () => {
    const email = `${'a'.repeat(250)}@example.com`
    expect(guardSubmission({ ...good(), email })).toMatchObject({ pass: false, status: 400 })
  })

  it('returns a controlled rejection for non-string json rather than throwing', () => {
    // The `as` cast at the call site is erased at runtime, so the body can hold
    // anything at all. Before these were type-checked, {"email":123} reached
    // .trim() and threw — a 500 out of the layer whose entire purpose is to
    // return controlled rejections, triggerable by three bytes of JSON.
    for (const email of [123, {}, null, [], true]) {
      expect(guardSubmission({ ...good(), email })).toMatchObject({ status: 400 })
    }
  })

  it('a filled honeypot fails SILENTLY, so the bot cannot tell it was caught', () => {
    // The one check a real visitor cannot trip, which is what makes a silent
    // rejection safe here and nowhere else.
    for (const honeypot of ['Acme', '  ']) {
      expect(guardSubmission({ ...good(), honeypot })).toMatchObject({
        pass: false,
        silent: true
      })
    }
  })

  it('a MISSING honeypot is refused visibly, not silently', () => {
    // Two senders arrive without it: a direct API caller that never knew the
    // field existed, and a page open since before this deployed. Refusing both
    // is the point — but silently would tell a real visitor on a stale page
    // that they subscribed when they did not, which is the failure mode this
    // whole guard exists to avoid. Visible means a refresh fixes it.
    for (const honeypot of [undefined, null, 123, {}]) {
      expect(guardSubmission({ ...good(), honeypot })).toMatchObject({
        pass: false,
        silent: false,
        status: 400
      })
    }
  })

  it('rate-limits a burst from one address, and lets a different one through', () => {
    const now = 1_700_000_000_000
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited('203.0.113.7', now + i)).toBe(false)
    }
    expect(isRateLimited('203.0.113.7', now + 5)).toBe(true)

    // A limit that leaked across addresses would take the whole list offline
    // the moment one bot showed up.
    expect(isRateLimited('198.51.100.4', now + 5)).toBe(false)
  })

  it('forgets a burst once the window has passed', () => {
    const now = 1_700_000_000_000
    for (let i = 0; i < 6; i++) isRateLimited('203.0.113.7', now + i)
    expect(isRateLimited('203.0.113.7', now + 61_000)).toBe(false)
  })
})
