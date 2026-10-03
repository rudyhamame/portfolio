import assert from 'node:assert/strict'
import test from 'node:test'
import { sendVerificationCode, confirmVerificationCode } from '../verify.js'

function response() {
  return {
    statusCode: 200,
    status(value) { this.statusCode = value; return this },
    json(value) { this.body = value; return this },
  }
}

test('verification requires successful email delivery before issuing a code', async (t) => {
  t.mock.method(console, 'error', () => {})
  const oldKey = process.env.BREVO_API_KEY
  const oldSender = process.env.EMAIL_FROM_ADDRESS
  t.after(() => {
    if (oldKey === undefined) delete process.env.BREVO_API_KEY
    else process.env.BREVO_API_KEY = oldKey
    if (oldSender === undefined) delete process.env.EMAIL_FROM_ADDRESS
    else process.env.EMAIL_FROM_ADDRESS = oldSender
  })
  delete process.env.BREVO_API_KEY
  delete process.env.EMAIL_FROM_ADDRESS
  const req = { body: { name: 'Test Visitor', email: 'visitor@example.com' } }
  const missing = response()
  await sendVerificationCode(req, missing)
  assert.equal(missing.statusCode, 502)
  assert.equal(missing.body.sent, undefined)

  process.env.BREVO_API_KEY = 'test-key'
  process.env.EMAIL_FROM_ADDRESS = 'sender@example.com'
  let deliveredCode
  const fetchMock = t.mock.method(globalThis, 'fetch', async (url, options) => {
    const payload = JSON.parse(options.body)
    assert.equal(options.method, 'POST')
    assert.equal(payload.to[0].email, 'visitor@example.com')
    deliveredCode = payload.subject.match(/\d{6}/)[0]
    return { ok: false, json: async () => ({ message: 'Delivery rejected' }) }
  })
  const rejected = response()
  await sendVerificationCode(req, rejected)
  assert.equal(rejected.statusCode, 502)
  const undelivered = response()
  confirmVerificationCode({ body: { email: req.body.email, code: deliveredCode } }, undelivered)
  assert.equal(undelivered.statusCode, 400)

  fetchMock.mock.mockImplementation(async (url, options) => {
    deliveredCode = JSON.parse(options.body).subject.match(/\d{6}/)[0]
    return { ok: true }
  })
  const sent = response()
  await sendVerificationCode(req, sent)
  assert.deepEqual(sent.body, { sent: true })
  const confirmed = response()
  confirmVerificationCode({ body: { email: req.body.email, code: deliveredCode } }, confirmed)
  assert.equal(confirmed.body.verified, true)
  assert.ok(confirmed.body.verificationToken)
})
