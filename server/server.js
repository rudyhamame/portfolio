import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User, Request, Update, REQUEST_STATUSES } from './models.js'
import {
  signToken,
  publicUser,
  requireAuth,
  requireAdmin,
  upload,
  UPLOAD_DIR,
} from './lib.js'
import { getChat, postChat, postPortfolioAssistant } from './chat.js'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(','),
  }),
)
app.use('/uploads', express.static(UPLOAD_DIR))
app.get('/health', (req, res) => res.json({ ok: true }))
app.post('/api/assistant', postPortfolioAssistant)

const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((e) => {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  })

// ── Auth ────────────────────────────────────────────────────────────────────
app.post(
  '/api/auth/signup',
  wrap(async (req, res) => {
    const { name, email, password } = req.body || {}
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ error: 'Name, email, and an 8+ char password required' })
    }
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(409).json({ error: 'That email is already registered' })
    }
    const user = await User.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: email.toLowerCase() === (process.env.ADMIN_EMAIL || '').toLowerCase() ? 'admin' : 'client',
    })
    res.json({ token: signToken(user._id), user: publicUser(user) })
  }),
)

app.post(
  '/api/auth/login',
  wrap(async (req, res) => {
    const { email, password } = req.body || {}
    const user = await User.findOne({ email: (email || '').toLowerCase() })
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
      return res.status(401).json({ error: 'Wrong email or password' })
    }
    res.json({ token: signToken(user._id), user: publicUser(user) })
  }),
)

app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user) }))

// ── Requests ────────────────────────────────────────────────────────────────
app.get(
  '/api/requests',
  requireAuth,
  wrap(async (req, res) => {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id }
    const requests = await Request.find(filter)
      .sort('-createdAt')
      .populate('user', 'name email')
    res.json(requests)
  }),
)

app.post(
  '/api/requests',
  requireAuth,
  wrap(async (req, res) => {
    const { title, idea, budget, timeline } = req.body || {}
    if (!title || !idea) return res.status(400).json({ error: 'Title and idea required' })
    const request = await Request.create({
      user: req.user._id,
      title,
      idea,
      budget: budget || '',
      timeline: timeline || '',
    })
    await Update.create({
      request: request._id,
      author: req.user._id,
      authorRole: 'client',
      body: 'Request submitted.',
      status: 'new',
    })
    res.json(request)
  }),
)

// Load + authorize a request into req.request
const loadRequest = wrap(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate('user', 'name email')
  if (!request) return res.status(404).json({ error: 'Not found' })
  const isOwner = String(request.user._id) === String(req.user._id)
  if (!isOwner && req.user.role !== 'admin') return res.status(403).json({ error: 'Not yours' })
  req.request = request
  next()
})

app.get(
  '/api/requests/:id',
  requireAuth,
  loadRequest,
  wrap(async (req, res) => {
    const updates = await Update.find({ request: req.request._id })
      .sort('createdAt')
      .populate('author', 'name role')
    res.json({ request: req.request, updates })
  }),
)

// Post an update. Admins can also change status in the same call.
app.post(
  '/api/requests/:id/updates',
  requireAuth,
  loadRequest,
  wrap(async (req, res) => {
    const { body, status } = req.body || {}
    if (!body) return res.status(400).json({ error: 'Update text required' })
    let newStatus
    if (status) {
      if (req.user.role !== 'admin') return res.status(403).json({ error: 'Only admins set status' })
      if (!REQUEST_STATUSES.includes(status)) return res.status(400).json({ error: 'Bad status' })
      req.request.status = status
      await req.request.save()
      newStatus = status
    }
    const update = await Update.create({
      request: req.request._id,
      author: req.user._id,
      authorRole: req.user.role,
      body,
      status: newStatus,
    })
    res.json(await update.populate('author', 'name role'))
  }),
)

app.post(
  '/api/requests/:id/files',
  requireAuth,
  loadRequest,
  upload.single('file'),
  wrap(async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file' })
    req.request.files.push({
      name: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    })
    await req.request.save()
    res.json(req.request.files)
  }),
)

// ── Chatbot ─────────────────────────────────────────────────────────────────
app.post('/api/chat', requireAuth, wrap(postChat))
app.get('/api/chat', requireAuth, wrap(getChat))

// ── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8600
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio', {
    serverSelectionTimeoutMS: 8000,
  })
  .then(() => {
    console.log('mongo connected')
    app.listen(PORT, () => console.log(`api on :${PORT}`))
  })
  .catch((e) => {
    console.error('mongo connection failed:', e.message)
    process.exit(1)
  })
