import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const { register, handleSubmit } = useForm({ defaultValues: { name: user?.name || '', email: user?.email || '', mobile: user?.mobile || '' } })

  const onSubmit = (data) => {
    updateProfile(data)
    toast.success('Profile updated successfully')
    setEditing(false)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Your Profile</h2>
            <p className="text-slate-400">Manage profile details and account settings.</p>
          </div>
          <button onClick={() => setEditing((prev) => !prev)} className="rounded-3xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-400">{editing ? 'Cancel' : 'Edit Profile'}</button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-slate-500">Profile Picture</p>
            <div className="mt-5 flex items-center gap-4">
              <div className="h-20 w-20 rounded-3xl bg-slate-800"></div>
              <div>
                <p className="text-lg font-semibold text-white">{user?.name || 'User'}</p>
                <p className="text-slate-400">{user?.email}</p>
                <p className="text-slate-400">{user?.mobile}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-slate-500">Account Details</p>
            <div className="mt-5 space-y-3 text-slate-400">
              <p><span className="text-slate-300">Created:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
              <p><span className="text-slate-300">Transactions:</span> 0</p>
              <p><span className="text-slate-300">Balance:</span> $0.00</p>
            </div>
          </div>
        </div>
      </section>
      {editing && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-slate-300">
              Full Name
              <input {...register('name')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            </label>
            <label className="block text-slate-300">
              Email
              <input type="email" {...register('email')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            </label>
            <label className="block text-slate-300">
              Mobile
              <input type="tel" {...register('mobile')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            </label>
            <button type="submit" className="rounded-3xl bg-green-500 px-6 py-3 text-white hover:bg-green-400">Save Changes</button>
          </form>
        </section>
      )}
    </div>
  )
}
