import crypto from 'crypto'
import { sendVerificationEmail } from './email.js'

const CODE_TTL_MS = 10 * 60 * 1000
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000
const MAX_ATTEMPTS = 5

const pendingCodes = new Map() // email -> { code, expiresAt, name, attempts }
const verifiedTokens = new Map() // token -> { email, name, expiresAt }

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// POST /api/assistant/verify/send { name, email }
export async function sendVerificationCode(req, res) {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 200) : ''
  const email = normalizeEmail(req.body?.email)
  if (!name) return res.status(400).json({ error: 'Name is required.' })
  if (!isValidEmail(email)) return res.status(400).json({ error: 'A valid email is required.' })

  const code = String(crypto.randomInt(100000, 1000000))
  pendingCodes.set(email, { code, expiresAt: Date.now() + CODE_TTL_MS, name, attempts: 0 })

  try {
    await sendVerificationEmail(name, email, code)
  } catch (err) {
    console.error('verification email error:', err.message)
    return res.status(502).json({ error: 'Could not send the verification email right now.' })
  }
  res.json({ sent: true })
}

// POST /api/assistant/verify/confirm { email, code }
export function confirmVerificationCode(req, res) {
  const email = normalizeEmail(req.body?.email)
  const code = typeof req.body?.code === 'string' ? req.body.code.trim() : ''
  const entry = pendingCodes.get(email)

  if (!entry || entry.expiresAt < Date.now()) {
    return res.status(400).json({ error: 'That code expired. Request a new one.' })
  }
  entry.attempts += 1
  if (entry.attempts > MAX_ATTEMPTS) {
    pendingCodes.delete(email)
    return res.status(429).json({ error: 'Too many attempts. Request a new code.' })
  }
  if (code !== entry.code) {
    return res.status(400).json({ error: 'Incorrect code.' })
  }

  pendingCodes.delete(email)
  const verificationToken = crypto.randomUUID()
  verifiedTokens.set(verificationToken, { email, name: entry.name, expiresAt: Date.now() + TOKEN_TTL_MS })
  res.json({ verified: true, verificationToken, name: entry.name, email })
}

// Returns { email, name } for a live token, or null.
export function checkVerificationToken(token) {
  if (typeof token !== 'string' || !token) return null
  const entry = verifiedTokens.get(token)
  if (!entry || entry.expiresAt < Date.now()) return null
  return entry
}
