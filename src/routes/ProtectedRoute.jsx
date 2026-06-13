import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // OTP verification removed — only require user to be present

  return <Outlet />
}