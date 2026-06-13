import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
// OTP removed: no external request required for login

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [method, setMethod] = useState('email')
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      login({
        email: data.email || '',
        mobile: data.mobile || '',
        password: data.password || '',
        method,
        remember
      })

      toast.success('Logged in')
      navigate('/')
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        'Unable to login'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-3xl bg-slate-950 p-8 shadow-glass border border-slate-800"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold text-white">
            Expense Analytics
          </h1>

          <p className="mt-2 text-slate-400">Secure login</p>
        </div>

        <div className="mb-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setMethod('email')}
            className={`rounded-full px-5 py-3 ${
              method === 'email'
                ? 'bg-slate-200 text-slate-950'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => setMethod('mobile')}
            className={`rounded-full px-5 py-3 ${
              method === 'mobile'
                ? 'bg-slate-200 text-slate-950'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            Mobile
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          {method === 'email' ? (
            <label className="block text-slate-300">
              Email

              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                {...register('email', {
                  required: 'Email is required'
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-rose-400">
                  {errors.email.message}
                </p>
              )}
            </label>
          ) : (
            <label className="block text-slate-300">
              Mobile

              <input
                type="tel"
                placeholder="9876543210"
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message:
                      'Enter a valid mobile number'
                  }
                })}
              />

              {errors.mobile && (
                <p className="mt-1 text-sm text-rose-400">
                  {errors.mobile.message}
                </p>
              )}
            </label>
          )}

          <label className="block text-slate-300">
            Password

            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-rose-400">
                {errors.password.message}
              </p>
            )}
          </label>

          <label className="inline-flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={() =>
                setRemember((prev) => !prev)
              }
            />
            Remember Me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-3xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-400 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-slate-500">
          <p>
            New to ExpenseAI?{' '}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}