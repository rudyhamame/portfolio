import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { api } from '../lib/api.js'
import ChatBot from '../components/ChatBot.jsx'

function NewRequestForm({ onCreated }) {
  const [form, setForm] = useState({ title: '', idea: '', budget: '', timeline: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('/api/requests', { method: 'POST', body: form })
      setForm({ title: '', idea: '', budget: '', timeline: '' })
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="form card" onSubmit={submit}>
      <h3 className="card__title">New request</h3>
      <label className="form__field">
        <span>Project title</span>
        <input value={form.title} onChange={set('title')} required />
      </label>
      <label className="form__field">
        <span>The idea</span>
        <textarea rows={4} value={form.idea} onChange={set('idea')} required />
      </label>
      <div className="form__row">
        <label className="form__field">
          <span>Budget (optional)</span>
          <input value={form.budget} onChange={set('budget')} placeholder="e.g. $2–5k" />
        </label>
        <label className="form__field">
          <span>Timeline (optional)</span>
          <input value={form.timeline} onChange={set('timeline')} placeholder="e.g. 6 weeks" />
        </label>
      </div>
      {error && <p className="chat__error">{error}</p>}
      <button className="btn btn--primary" disabled={busy}>
        Submit request
      </button>
    </form>
  )
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const [requests, setRequests] = useState([])
  const [showForm, setShowForm] = useState(false)

  const load = () => api('/api/requests').then(setRequests).catch(() => {})
  useEffect(() => {
    if (user) load()
  }, [user])

  if (loading) return <section className="section" />
  if (!user) return <Navigate to="/portal" replace />

  const isAdmin = user.role === 'admin'

  return (
    <section className="section projects-page">
      <div className="dash__head">
        <h1 className="projects-page__title">
          {isAdmin ? 'All requests' : 'Your dashboard'}
        </h1>
        <button className="btn" onClick={logout}>
          Sign out
        </button>
      </div>
      <p className="ptab__blurb">Signed in as {user.name} ({user.email}).</p>

      {!isAdmin && (
        <>
          <button className="btn btn--primary" onClick={() => setShowForm((s) => !s)}>
            {showForm ? 'Cancel' : '+ New request'}
          </button>
          {showForm && (
            <div style={{ marginTop: 16 }}>
              <NewRequestForm
                onCreated={() => {
                  setShowForm(false)
                  load()
                }}
              />
            </div>
          )}
        </>
      )}

      <div className="grid" style={{ marginTop: 24 }}>
        {requests.map((r) => (
          <Link key={r._id} to={`/portal/requests/${r._id}`} className="card">
            <span className={`badge badge--${r.status}`}>{r.status}</span>
            <h3 className="card__title">{r.title}</h3>
            <p className="card__blurb">{r.idea.slice(0, 140)}</p>
            {isAdmin && r.user && (
              <p className="card__blurb">— {r.user.name} ({r.user.email})</p>
            )}
          </Link>
        ))}
        {requests.length === 0 && (
          <p className="emulator__placeholder">No requests yet.</p>
        )}
      </div>

      {!isAdmin && (
        <div style={{ marginTop: 40 }}>
          <ChatBot title="Scope an idea" />
        </div>
      )}
    </section>
  )
}
