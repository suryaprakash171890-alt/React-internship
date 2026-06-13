import { useMemo, useState } from 'react'
import { useFinance } from '../../context/FinanceContext'
import { useForm } from 'react-hook-form'
import { FiPlus, FiSearch, FiTrash2, FiEdit2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { exportToCSV } from '../../utils/exportCSV'

const categoryOptions = {
  income: ['Salary', 'Freelancing', 'Investments', 'Bonus', 'Business', 'Rental Income', 'Other'],
  expense: ['Food', 'Transport', 'Shopping', 'Rent', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Travel', 'Insurance', 'EMI', 'Other'],
}

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance()
  const [selectedType, setSelectedType] = useState('expense')
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: { type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10) },
  })

  const onSubmit = (data) => {
    const payload = { ...data, amount: Number(data.amount), id: editing?.id || Date.now() }
    if (editing) {
      updateTransaction(payload)
      toast.success('Transaction updated')
    } else {
      addTransaction(payload)
      toast.success('Transaction added')
    }
    reset({ type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10), paymentMethod: 'Cash', description: '', notes: '' })
    setEditing(null)
  }

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => (filterType === 'all' ? true : tx.type === filterType))
      .filter((tx) => tx.description.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase()) || tx.notes.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const cmp = sortBy === 'amount' ? a.amount - b.amount : new Date(a.date) - new Date(b.date)
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [transactions, filterType, search, sortBy, sortDir])

  const startEdit = (tx) => {
    setEditing(tx)
    reset(tx)
    setSelectedType(tx.type)
  }

  const handleExport = () => {
    exportToCSV(transactions, 'transactions.csv')
    toast.success('Transactions exported')
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Transaction Entry</h2>
              <p className="text-slate-400">Add income or expense records with full details.</p>
            </div>
            <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-3xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
              <FiPlus /> Export CSV
            </button>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-slate-300">
                Type
                <select {...register('type', { required: true })} onChange={(e) => setSelectedType(e.target.value)} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label>
              <label className="block text-slate-300">
                Category
                <select {...register('category', { required: true })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
                  {categoryOptions[selectedType].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-slate-300">
                Amount
                <input type="number" step="0.01" {...register('amount', { required: 'Amount is required', min: { value: 0.01, message: 'Amount must be greater than 0' } })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
                {errors.amount && <p className="mt-1 text-sm text-rose-400">{errors.amount.message}</p>}
              </label>
              <label className="block text-slate-300">
                Date
                <input type="date" {...register('date', { required: 'Date is required' })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-slate-300">
                Payment Method
                <input type="text" {...register('paymentMethod', { required: true })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Cash, Card, UPI" />
              </label>
              <label className="block text-slate-300">
                Description
                <input type="text" {...register('description', { required: true })} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Short description" />
              </label>
            </div>
            <label className="block text-slate-300">
              Notes
              <textarea {...register('notes')} rows="3" className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Add optional notes" />
            </label>
            <button type="submit" className="rounded-3xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-400">
              {editing ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
          <h2 className="text-2xl font-semibold text-white">Filters</h2>
          <div className="mt-5 space-y-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions" className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <div className="grid gap-4 sm:grid-cols-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
              <select value={sortDir} onChange={(e) => setSortDir(e.target.value)} className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Transactions</h2>
          <p className="text-slate-400">{filteredTransactions.length} records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
            <thead>
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/80">
                  <td className="px-4 py-4">{tx.date}</td>
                  <td className="px-4 py-4">{tx.category}</td>
                  <td className="px-4 py-4 text-cyan-300">{tx.type}</td>
                  <td className="px-4 py-4">{tx.description}</td>
                  <td className="px-4 py-4">${tx.amount.toFixed(2)}</td>
                  <td className="px-4 py-4">{tx.paymentMethod}</td>
                  <td className="px-4 py-4 space-x-2">
                    <button onClick={() => startEdit(tx)} className="rounded-full bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700"><FiEdit2 /></button>
                    <button onClick={() => { deleteTransaction(tx.id); toast.success('Transaction deleted') }} className="rounded-full bg-rose-500 px-3 py-2 text-white hover:bg-rose-400"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
