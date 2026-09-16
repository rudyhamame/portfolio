import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { API_BASE, api } from '../lib/api.js'
import ChatBot from '../components/ChatBot.jsx'

const STATUSES = ['new', 'reviewing', 'in-progress', 'delivered', 'declined']
export default function RequestPage() {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const [data, setData] = useState(null)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [err, setErr] = useState('')

  const load = () => api(`/api/requests/${id}`).then((d) => {
    setData(d)
    setStatus(d.request.status)
  }).catch((e) => setErr(e.message))

  useEffect(() => {
    if (user) load()
  }, [user, id])

  if (loading) return <section className="section" />
  if (!user) return <Navigate to="/portal" replace />
  if (err) return <section className="section"><p className="chat__error">{err}</p></section>
  if (!data) return <section className="section" />

  const { request, updates } = data
  const isAdmin = user.role === 'admin'

  async function postUpdate(e) {
    e.preventDefault()
    setErr('')
    try {
      await api(`/api/requests/${id}/updates`, {
        method: 'POST',
        body: {
          body: note,
          status: isAdmin && status !== request.status ? status : undefined,
        },
      })
      setNote('')
      load()
    } catch (e2) {
      setErr(e2.message)
    }
  }

  async function uploadFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    await api(`/api/requests/${id}/files`, { method: 'POST', form }).catch((e2) => setErr(e2.message))
    load()
  }

  return (
    <section className="section projects-page">
      <Link to="/portal/dashboard" className="card__link">
        ← Back
      </Link>
      <h1 className="projects-page__title">{request.title}</h1>
      <span className={`badge badge--${request.status}`}>{request.status}</span>

      <div className="req__meta">
        <p>{request.idea}</p>
        {request.budget && <p><strong>Budget:</strong> {request.budget}</p>}
        {request.timeline && <p><strong>Timeline:</strong> {request.timeline}</p>}
      </div>

      <h2 className="ptab__heading">Files</h2>
      <ul className="req__files">
        {request.files.map((f) => (
          <li key={f.name}>
            <a href={`${API_BASE}/uploads/${f.name}`} target="_blank" rel="noreferrer">
              {f.originalName}
            </a>{' '}
            ({Math.round(f.size / 1024)} KB)
          </li>
        ))}
        {request.files.length === 0 && <li className="chat__hint">None yet.</li>}
      </ul>
      <input type="file" onChange={uploadFile} />

      <h2 className="ptab__heading">Updates</h2>
      <ol className="timeline">
        {updates.map((u) => (
          <li key={u._id} className="timeline__item">
            <div className="timeline__head">
              <strong>{u.author?.name || u.authorRole}</strong>
              {u.status && <span className={`badge badge--${u.status}`}>{u.status}</span>}
              <time>{new Date(u.createdAt).toLocaleDateString()}</time>
            </div>
            <p>{u.body}</p>
          </li>
        ))}
      </ol>

      <form className="form" onSubmit={postUpdate}>
        <label className="form__field">
          <span>{isAdmin ? 'Post an update' : 'Add a note'}</span>
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} required />
        </label>
        {isAdmin && (
          <label className="form__field">
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}
        {err && <p className="chat__error">{err}</p>}
        <button className="btn btn--primary">Post</button>
      </form>

      <div style={{ marginTop: 40 }}>
        <ChatBot requestId={id} title="Ask about this project" />
      </div>
    </section>
  )
}
