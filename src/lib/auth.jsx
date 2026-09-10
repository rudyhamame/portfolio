import { createContext, useContext, useEffect, useState } from 'react'
import { api, getToken, setToken } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getToken()) return setLoading(false)
    api('/api/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => setToken(null))
      .finally(() => setLoading(false))
  }, [])

  const finish = ({ token, user }) => {
    setToken(token)
    setUser(user)
  }

  const login = (email, password) =>
    api('/api/auth/login', { method: 'POST', body: { email, password } }).then(finish)

  const signup = (name, email, password) =>
    api('/api/auth/signup', { method: 'POST', body: { name, email, password } }).then(finish)

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
