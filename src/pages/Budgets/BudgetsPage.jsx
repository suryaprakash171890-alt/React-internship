import { useState } from 'react'
import { useFinance } from '../../context/FinanceContext'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function BudgetsPage() {
  const { budgets, addBudget, updateBudget, deleteBudget, transactions } = useFinance()
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset } = useForm({ defaultValues: { name: '', amount: '', period: 'monthly', category: 'General' } })

  const spentByBudget = (budget) => {
    const spent = transactions.filter((tx) => tx.category === budget.category && tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount), 0)
    return spent
  }

  const onSubmit = (data) => {
    const payload = { ...data, id: editing?.id || Date.now(), amount: Number(data.amount), createdAt: new Date().toISOString() }
    if (editing) {
      updateBudget(payload)
      toast.success('Budget updated')
    } else {
      addBudget(payload)
      toast.success('Budget created')
    }
    setEditing(null)
    reset({ name: '', amount: '', period: 'monthly', category: 'General' })
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <h2 className="text-2xl font-semibold text-white">Budget Management</h2>
        <form className="mt-6 grid gap-4 xl:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-slate-300">
            Budget Name
            <input {...register('name', { required: true })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          </label>
          <label className="block text-slate-300">
            Amount
            <input type="number" step="0.01" {...register('amount', { required: true })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          </label>
          <label className="block text-slate-300">
            Period
            <select {...register('period')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>
          <label className="block text-slate-300">
            Category
            <input {...register('category')} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          </label>
          <button type="submit" className="rounded-3xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-400 w-fit">{editing ? 'Update Budget' : 'Create Budget'}</button>
        </form>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <h2 className="text-2xl font-semibold text-white">Active Budgets</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {budgets.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 p-6 text-slate-400">No budgets created yet.</div>
          ) : budgets.map((budget) => {
            const spent = spentByBudget(budget)
            const percent = budget.amount ? Math.min(100, Math.round((spent / budget.amount) * 100)) : 0
            return (
              <div key={budget.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-glass">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-slate-400">{budget.category} • {budget.period}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{budget.name}</h3>
                  </div>
                  <div className={`rounded-2xl px-3 py-1 text-sm ${percent > 100 ? 'bg-rose-500 text-white' : percent > 80 ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'}`}>{percent}%</div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-slate-400">Budget: ${budget.amount.toFixed(2)}</p>
                  <p className="text-slate-400">Spent: ${spent.toFixed(2)}</p>
                  <p className="text-slate-400">Remaining: ${(budget.amount - spent).toFixed(2)}</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div style={{ width: `${Math.min(100, percent)}%` }} className="h-full rounded-full bg-blue-400" />
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => { setEditing(budget); reset(budget) }} className="rounded-2xl bg-slate-800 px-4 py-2 text-slate-200">Edit</button>
                  <button onClick={() => { deleteBudget(budget.id); toast.success('Budget removed') }} className="rounded-2xl bg-rose-500 px-4 py-2 text-white">Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
