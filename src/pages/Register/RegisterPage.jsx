import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const { register: create } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password', '')

  const onSubmit = (data) => {
    setLoading(true)
    setTimeout(() => {
      create({ name: data.name, email: data.email, mobile: data.mobile, password: data.password, photo: '' })
      setLoading(false)
      toast.success('Registration successful')
      navigate('/')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glass">
        <h2 className="text-3xl font-semibold text-white">Create your account</h2>
        <p className="mt-2 text-slate-400">Start tracking your expenses with powerful analytics.</p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-slate-300">
            Full Name
            <input {...register('name', { required: 'Name is required' })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            {errors.name && <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>}
          </label>

          <label className="block text-slate-300">
            Email
            <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>}
          </label>

          <label className="block text-slate-300">
            Mobile Number
            <input type="tel" {...register('mobile', { required: 'Mobile is required', pattern: { value: /^[0-9]{10,15}$/, message: 'Enter a valid mobile number' } })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            {errors.mobile && <p className="mt-1 text-sm text-rose-400">{errors.mobile.message}</p>}
          </label>

          <label className="block text-slate-300">
            Password
            <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            {errors.password && <p className="mt-1 text-sm text-rose-400">{errors.password.message}</p>}
          </label>

          <label className="block text-slate-300">
            Confirm Password
            <input type="password" {...register('confirmPassword', { required: 'Confirm password is required', validate: (value) => value === password || 'Passwords do not match' })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            {errors.confirmPassword && <p className="mt-1 text-sm text-rose-400">{errors.confirmPassword.message}</p>}
          </label>

          <button type="submit" disabled={loading} className="rounded-3xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-400 disabled:opacity-60">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-400">Already have an account? <Link to="/login" className="text-blue-400">Login</Link></p>
      </div>
    </div>
  )
}
