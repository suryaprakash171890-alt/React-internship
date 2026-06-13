const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const getSummaryFromTransactions = (transactions) => {
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0)
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0)
  const savings = income - expense
  const savingsRate = income ? Math.round((savings / income) * 100) : 0
  const growth = 0
  const totalTransactions = transactions.length
  const health = income ? Math.min(100, Math.round((income - expense) / income * 100)) : 0
  return { income, expense, savings, savingsRate, growth, totalTransactions, health }
}

export const getCategoryDistribution = (transactions) => {
  const groups = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    return acc
  }, {})
  return Object.entries(groups).map(([name, value]) => ({ name, value }))
}

export const getMonthlyTrends = (transactions) => {
  const monthly = {}
  transactions.forEach((t) => {
    const date = new Date(t.date)
    const month = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    monthly[month] = monthly[month] || { month, income: 0, expense: 0 }
    monthly[month][t.type] += Number(t.amount)
  })
  return Object.values(monthly)
}

export const getExpenseByCategory = (transactions) => {
  const categories = transactions.filter((t) => t.type === 'expense')
  return categories.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    return acc
  }, {})
}
