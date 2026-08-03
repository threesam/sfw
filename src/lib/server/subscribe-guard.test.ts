import { beforeEach, describe, expect, it } from 'vitest'
import { MIN_SUBMIT_MS, guardSubmission, resetGuardForTests } from './subscribe-guard'

// A submission that should pass every layer. Each test below changes exactly
// one field, so a failure names the layer that rejected it.
const good = () => ({
  email: 'reader@example.com',
  company: '',
  elapsedMs: MIN_SUBMIT_MS + 1,
  ip: '203.0.113.7',
  now: 1_700_000_000_000
})

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

  it('a filled honeypot fails silently, so the bot cannot tell it was caught', () => {
    expect(guardSubmission({ ...good(), company: 'Acme' })).toMatchObject({
      pass: false,
      silent: true
    })
  })

  it('rejects a submission with no elapsed count — it did not come from the form', () => {
    for (const elapsedMs of [undefined, NaN, Infinity]) {
      expect(guardSubmission({ ...good(), elapsedMs })).toMatchObject({
        pass: false,
        silent: true
      })
    }
  })

  it('rejects a submission faster than a human, and accepts one at the threshold', () => {
    expect(guardSubmission({ ...good(), elapsedMs: 40 }).pass).toBe(false)
    expect(guardSubmission({ ...good(), elapsedMs: MIN_SUBMIT_MS - 1 }).pass).toBe(false)
    expect(guardSubmission({ ...good(), elapsedMs: MIN_SUBMIT_MS }).pass).toBe(true)
  })

  it('rate-limits a burst from one address, and lets a different one through', () => {
    const now = 1_700_000_000_000
    for (let i = 0; i < 5; i++) {
      expect(guardSubmission({ ...good(), now: now + i }).pass).toBe(true)
    }
    expect(guardSubmission({ ...good(), now: now + 5 })).toMatchObject({
      pass: false,
      silent: false,
      status: 429
    })

    // A rate limit that leaked across IPs would take the whole list offline
    // the moment one bot showed up.
    expect(guardSubmission({ ...good(), ip: '198.51.100.4', now: now + 5 }).pass).toBe(true)
  })

  it('forgets a burst once the window has passed', () => {
    const now = 1_700_000_000_000
    for (let i = 0; i < 6; i++) guardSubmission({ ...good(), now: now + i })
    expect(guardSubmission({ ...good(), now: now + 61_000 }).pass).toBe(true)
  })
})
