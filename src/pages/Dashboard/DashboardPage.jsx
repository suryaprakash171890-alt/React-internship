import { FiArrowUpRight, FiTrendingUp, FiShield, FiDollarSign } from 'react-icons/fi'
import { useFinance } from '../../context/FinanceContext'
import SmallCard from '../../components/Common/SmallCard'
import { IncomeExpenseTrend, ExpenseCategoryPie } from '../../components/Charts/AnalyticsCharts'

const demoMetrics = [
  { title: 'Savings Rate', value: '32%', description: 'Your monthly savings efficiency', icon: <FiTrendingUp /> },
  { title: 'Monthly Growth', value: '+14%', description: 'Growth from last month', icon: <FiArrowUpRight /> },
  { title: 'Health Score', value: '88', description: 'Financial health indicator', icon: <FiShield /> },
]

export default function DashboardPage() {
  const { summary, categoryDistribution, monthlyTrends } = useFinance()

  return (
    <div className="space-y-8">
      <section className="grid gap-5 xl:grid-cols-4">
        <SmallCard title="Total Income" value={`$${summary.income.toFixed(2)}`} description="Income earned this month" icon={<FiDollarSign />} />
        <SmallCard title="Total Expenses" value={`$${summary.expense.toFixed(2)}`} description="Expenses recorded" icon={<FiDollarSign />} />
        <SmallCard title="Current Balance" value={`$${summary.savings.toFixed(2)}`} description="Savings available" icon={<FiDollarSign />} />
        <SmallCard title="Savings Rate" value={`${summary.savingsRate}%`} description="Income saved" icon={<FiTrendingUp />} />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {demoMetrics.map((metric) => (
          <SmallCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <IncomeExpenseTrend data={monthlyTrends.length ? monthlyTrends : [{ month: 'Jan', income: 0, expense: 0 }]} />
        <ExpenseCategoryPie data={categoryDistribution.length ? categoryDistribution : [{ name: 'No data', value: 1 }]} />
      </section>
    </div>
  )
}
