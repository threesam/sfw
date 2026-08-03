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
    // A distinct address per case. The rate limit runs first now, so sharing
    // one would make the sixth case come back 429 and stop testing shape.
    const cases = [undefined, '', '   ', 'x', 'no-at-sign.com', 'two@@at.com', 'a@b']
    cases.forEach((email, i) => {
      expect(guardSubmission({ ...good(), email, ip: `203.0.113.${i}` })).toMatchObject({
        pass: false,
        silent: false,
        status: 400
      })
    })
  })

  it('returns a controlled rejection for non-string json rather than throwing', () => {
    // The `as` cast at the call site is erased at runtime, so the body can hold
    // anything at all. Before these were type-checked, {"email":123} reached
    // .trim() and threw — a 500 out of the layer whose entire purpose is to
    // return controlled rejections, triggerable by three bytes of JSON.
    expect(guardSubmission({ ...good(), email: 123, ip: '192.0.2.1' })).toMatchObject({
      status: 400
    })
    expect(guardSubmission({ ...good(), email: {}, ip: '192.0.2.2' })).toMatchObject({
      status: 400
    })
    expect(guardSubmission({ ...good(), email: null, ip: '192.0.2.3' })).toMatchObject({
      status: 400
    })
    // A non-string honeypot is not this form either, so it fails silently.
    expect(guardSubmission({ ...good(), company: {}, ip: '192.0.2.4' })).toMatchObject({
      silent: true
    })
    // Whitespace used to be trimmed to empty and let through.
    expect(guardSubmission({ ...good(), company: '  ', ip: '192.0.2.5' })).toMatchObject({
      silent: true
    })
  })

  it('counts every request toward the limit, whatever layer would catch it', () => {
    const now = 1_700_000_000_000
    // Five malformed submissions. Each is rejected on shape — and each still
    // ticks the counter, which is the whole point of the rate limit running
    // first. Were it last, these five would return early without counting and
    // the sixth would come back 400, meaning a bot sending garbage (or bare
    // {"email":"..."} with no elapsed count) could spray forever unlimited.
    for (let i = 0; i < 5; i++) guardSubmission({ ...good(), email: 'nope', now: now + i })
    expect(guardSubmission({ ...good(), now: now + 5 })).toMatchObject({ status: 429 })
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
    const cases = [undefined, NaN, Infinity]
    cases.forEach((elapsedMs, i) => {
      expect(guardSubmission({ ...good(), elapsedMs, ip: `198.51.100.${i}` })).toMatchObject({
        pass: false,
        silent: true
      })
    })
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
