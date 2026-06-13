import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Legend } from 'recharts'

export function IncomeExpenseTrend({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
      <h3 className="text-lg font-semibold text-white">Income vs Expense Trend</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} />
          <Line type="monotone" dataKey="expense" stroke="#f97316" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ExpenseCategoryPie({ data }) {
  const colors = ['#38bdf8','#818cf8','#fb7185','#facc15','#22c55e','#a855f7']
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
      <h3 className="text-lg font-semibold text-white">Expense Distribution</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
            {data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MonthlyExpenseBar({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
      <h3 className="text-lg font-semibold text-white">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
          <Bar dataKey="expense" fill="#f97316" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
