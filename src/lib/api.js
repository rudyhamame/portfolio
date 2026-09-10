// Base URL of the portfolio backend (server/). Set VITE_API_URL in a .env file
// for the frontend, e.g. VITE_API_URL=http://localhost:8600
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8600').replace(/\/+$/, '')

export const apiConfigured = Boolean(import.meta.env.VITE_API_URL)

const tokenKey = 'portfolio_token'
export const getToken = () => localStorage.getItem(tokenKey)
export const setToken = (t) =>
  t ? localStorage.setItem(tokenKey, t) : localStorage.removeItem(tokenKey)

export async function api(path, { method = 'GET', body, form } = {}) {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: form ? form : body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}
