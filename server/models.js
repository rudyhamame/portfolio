import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
  },
  { timestamps: true },
)

const STATUSES = ['new', 'reviewing', 'in-progress', 'delivered', 'declined']

const requestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    idea: { type: String, required: true },
    budget: { type: String, default: '' },
    timeline: { type: String, default: '' },
    status: { type: String, enum: STATUSES, default: 'new' },
    files: [
      {
        name: String, // stored filename
        originalName: String,
        size: Number,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
)

// Status-timeline / progress notes. authorRole tells the client who wrote it.
const updateSchema = new Schema(
  {
    request: { type: Schema.Types.ObjectId, ref: 'Request', required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorRole: { type: String, enum: ['client', 'admin'], required: true },
    body: { type: String, required: true },
    status: { type: String, enum: STATUSES }, // set when this update also changed status
  },
  { timestamps: true },
)

const chatMessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    request: { type: Schema.Types.ObjectId, ref: 'Request', index: true }, // optional scope
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)
export const Request = model('Request', requestSchema)
export const Update = model('Update', updateSchema)
export const ChatMessage = model('ChatMessage', chatMessageSchema)
export const REQUEST_STATUSES = STATUSES
