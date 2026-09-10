import fs from 'node:fs'
import path from 'node:path'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { User } from './models.js'

const SECRET = process.env.JWT_SECRET || 'change-me'

export const signToken = (userId) =>
  jwt.sign({ uid: userId }, SECRET, { expiresIn: '7d' })

export const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
})

// Attaches req.user (the Mongoose doc) or 401s.
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Not signed in' })
  try {
    const { uid } = jwt.verify(token, SECRET)
    const user = await User.findById(uid)
    if (!user) return res.status(401).json({ error: 'Account not found' })
    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: 'Session expired' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admins only' })
  next()
}

// File uploads -> server/uploads/. ponytail: local disk; won't survive an
// ephemeral host restart (Render free tier). Move to S3/R2 if that matters.
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads')
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

export const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) =>
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`),
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
})
