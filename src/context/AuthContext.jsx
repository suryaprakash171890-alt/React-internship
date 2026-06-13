import { createContext, useContext, useEffect, useState } from 'react'
import { readLocal, writeLocal, removeLocal } from '../utils/localStorage'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)

const SESSION_KEY = 'dea_session'
const USER_KEY = 'dea_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const storedUser = readLocal(USER_KEY)

    if (storedUser) {
      setUser(storedUser)
    }

    setAuthLoading(false)
  }, [])

  const login = ({ email, mobile, password, method }) => {
    const storedUser = readLocal(USER_KEY)

    if (!storedUser) {
      toast.error('No account found. Please register first')
      return
    }

    const usingEmail = method === 'email'
    const identifierMatches = usingEmail
      ? storedUser.email === email
      : storedUser.mobile === mobile

    if (!identifierMatches || storedUser.password !== (password || '')) {
      toast.error('Invalid credentials')
      return
    }

    writeLocal(SESSION_KEY, {
      token: 'mock-token',
      expiresAt: Date.now() + 3600 * 1000
    })

    setUser(storedUser)
  }

  const logout = () => {
    removeLocal(USER_KEY)
    removeLocal(SESSION_KEY)
    setUser(null)

    setAuthLoading(false)

    toast.info('Logged out')
  }

  const register = ({ name, email, mobile, password, photo }) => {
    const payload = {
      id: Date.now(),
      name,
      email,
      mobile,
      password,
      photo,
      createdAt: new Date().toISOString()
    }

    writeLocal(USER_KEY, payload)

    writeLocal(SESSION_KEY, {
      token: 'mock-token',
      expiresAt: Date.now() + 3600 * 1000
    })
    setUser(payload)

    toast.success('Account created successfully')
  }

  const updateProfile = (update) => {
    const next = { ...user, ...update }

    writeLocal(USER_KEY, next)
    setUser(next)

    toast.success('Profile updated')
  }

  const value = {
    user,
    authLoading,
    login,
    logout,
    register,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
  }
export const useAuth = () => useContext(AuthContext)