import { useForm } from 'react-hook-form'
import { useTheme } from '../../context/ThemeContext'
import { useFinance } from '../../context/FinanceContext'
import { toast } from 'react-toastify'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { settings, setSettings } = useFinance()
  const { register, handleSubmit } = useForm({ defaultValues: settings })

  const onSubmit = (data) => {
    setSettings(data)
    toast.success('Settings updated')
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <h2 className="text-3xl font-semibold text-white">Theme</h2>
        <p className="mt-2 text-slate-400">Customize your UI appearance.</p>
        <button onClick={toggleTheme} className="mt-6 rounded-3xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-400">Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
      </section>
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <h2 className="text-3xl font-semibold text-white">Account Preferences</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-slate-300">
            Currency
            <input {...register('currency')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          </label>
          <label className="block text-slate-300">
            Payment Methods
            <input {...register('paymentMethods')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Comma-separated" />
          </label>
          <label className="inline-flex items-center gap-3 text-slate-300">
            <input type="checkbox" {...register('notifications')} className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-slate-100" />
            Enable notifications
          </label>
          <button type="submit" className="rounded-3xl bg-sky-500 px-6 py-3 text-white hover:bg-sky-400">Save Preferences</button>
        </form>
      </section>
    </div>
  )
}
