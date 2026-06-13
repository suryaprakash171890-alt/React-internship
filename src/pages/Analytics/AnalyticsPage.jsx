import { useFinance } from '../../context/FinanceContext'
import { ExpenseCategoryPie, MonthlyExpenseBar, IncomeExpenseTrend } from '../../components/Charts/AnalyticsCharts'

export default function AnalyticsPage() {
  const { categoryDistribution, monthlyTrends, summary } = useFinance()

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <h2 className="text-3xl font-semibold text-white">Expense Analytics</h2>
        <p className="mt-2 text-slate-400">Advanced financial insights for smarter spending.</p>
      </header>

      <section className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
          <h3 className="text-sm uppercase tracking-[0.25em] text-slate-500">Expense-to-Income Ratio</h3>
          <p className="mt-4 text-4xl font-semibold text-white">{summary.income ? `${Math.round((summary.expense / summary.income) * 100)}%` : '0%'}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
          <h3 className="text-sm uppercase tracking-[0.25em] text-slate-500">Monthly Expense Avg</h3>
          <p className="mt-4 text-4xl font-semibold text-white">${summary.income ? (summary.expense / 1).toFixed(2) : '0.00'}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
          <h3 className="text-sm uppercase tracking-[0.25em] text-slate-500">Savings Rate</h3>
          <p className="mt-4 text-4xl font-semibold text-white">{summary.savingsRate}%</p>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <IncomeExpenseTrend data={monthlyTrends.length ? monthlyTrends : [{ month: 'Jan', income: 0, expense: 0 }]} />
        <ExpenseCategoryPie data={categoryDistribution.length ? categoryDistribution : [{ name: 'No data', value: 1 }]} />
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
        <MonthlyExpenseBar data={monthlyTrends.length ? monthlyTrends : [{ month: 'Jan', income: 0, expense: 0 }]} />
      </section>
    </div>
  )
}
