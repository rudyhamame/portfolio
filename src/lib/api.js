// Production uses the frontend's same-origin /api proxy so HTTPS deployments
// never try to reach a private or insecure backend URL from the browser.
const CONFIGURED_BASE = String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const PRODUCTION_BASE = typeof window === 'undefined' ? '' : window.location.origin

export const API_BASE = import.meta.env.PROD
  ? PRODUCTION_BASE
  : CONFIGURED_BASE || 'http://localhost:8600'

export const apiConfigured = import.meta.env.PROD || Boolean(CONFIGURED_BASE)

const tokenKey = 'portfolio_token'
export const getToken = () => localStorage.getItem(tokenKey)
export const setToken = (t) =>
  t ? localStorage.setItem(tokenKey, t) : localStorage.removeItem(tokenKey)

export async function api(path, { method = 'GET', body, form } = {}) {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: form ? form : body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}
