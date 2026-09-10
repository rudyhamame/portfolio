import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { apiConfigured } from '../lib/api.js'

export default function PortalPage() {
  const { user, login, signup } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/portal/dashboard" replace />

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'login') await login(form.email, form.password)
      else await signup(form.name, form.email, form.password)
      navigate('/portal/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section portal">
      <h1 className="projects-page__title">Client portal</h1>
      <p className="ptab__blurb">
        Sign in to submit a project idea and follow its progress.
      </p>

      {!apiConfigured && (
        <p className="chat__error">
          The portal backend isn’t connected yet (set <code>VITE_API_URL</code>).
        </p>
      )}

      <div className="ptabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'login'}
          className={mode === 'login' ? 'ptabs__tab ptabs__tab--active' : 'ptabs__tab'}
          onClick={() => setMode('login')}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'signup'}
          className={mode === 'signup' ? 'ptabs__tab ptabs__tab--active' : 'ptabs__tab'}
          onClick={() => setMode('signup')}
        >
          Create account
        </button>
      </div>

      <form className="form" onSubmit={submit}>
        {mode === 'signup' && (
          <label className="form__field">
            <span>Name</span>
            <input value={form.name} onChange={set('name')} required />
          </label>
        )}
        <label className="form__field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={set('email')} required />
        </label>
        <label className="form__field">
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={set('password')}
            minLength={8}
            required
          />
        </label>
        {error && <p className="chat__error">{error}</p>}
        <button className="btn btn--primary" disabled={busy}>
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </section>
  )
}
