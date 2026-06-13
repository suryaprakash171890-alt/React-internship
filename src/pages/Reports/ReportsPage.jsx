import { useFinance } from '../../context/FinanceContext'
import { exportToCSV } from '../../utils/exportCSV'
import { FiDownload } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function ReportsPage() {
  const { summary, transactions } = useFinance()

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Monthly Report</h2>
            <p className="text-slate-400">Generate and export your financial report.</p>
          </div>
          <button onClick={() => { exportToCSV(transactions, 'report.csv'); toast.success('Report exported') }} className="inline-flex items-center gap-2 rounded-3xl bg-blue-500 px-5 py-3 text-white hover:bg-blue-400">
            <FiDownload /> Export CSV
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Income</p>
            <p className="mt-3 text-3xl font-semibold text-white">${summary.income.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Expenses</p>
            <p className="mt-3 text-3xl font-semibold text-white">${summary.expense.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Net Savings</p>
            <p className="mt-3 text-3xl font-semibold text-white">${summary.savings.toFixed(2)}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
