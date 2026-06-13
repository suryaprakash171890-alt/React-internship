import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readLocal, writeLocal } from '../utils/localStorage'
import { getSummaryFromTransactions, getCategoryDistribution, getMonthlyTrends } from '../utils/calculations'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [settings, setSettings] = useState({ currency: 'USD', paymentMethods: ['Cash', 'Card', 'UPI'], notifications: true })

  useEffect(() => {
    setTransactions(readLocal('dea_transactions') || [])
    setBudgets(readLocal('dea_budgets') || [])
    setSettings(readLocal('dea_settings') || settings)
  }, [])

  const saveTransactions = (next) => {
    setTransactions(next)
    writeLocal('dea_transactions', next)
  }

  const addTransaction = (item) => {
    saveTransactions([...transactions, item])
  }

  const updateTransaction = (next) => {
    saveTransactions(transactions.map((item) => (item.id === next.id ? next : item)))
  }

  const deleteTransaction = (id) => {
    saveTransactions(transactions.filter((item) => item.id !== id))
  }

  const addBudget = (budget) => {
    const next = [...budgets, budget]
    setBudgets(next)
    writeLocal('dea_budgets', next)
  }

  const updateBudget = (next) => {
    const updated = budgets.map((item) => (item.id === next.id ? next : item))
    setBudgets(updated)
    writeLocal('dea_budgets', updated)
  }

  const deleteBudget = (id) => {
    const next = budgets.filter((item) => item.id !== id)
    setBudgets(next)
    writeLocal('dea_budgets', next)
  }

  const summary = useMemo(() => getSummaryFromTransactions(transactions), [transactions])
  const categoryDistribution = useMemo(() => getCategoryDistribution(transactions), [transactions])
  const monthlyTrends = useMemo(() => getMonthlyTrends(transactions), [transactions])

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        settings,
        summary,
        categoryDistribution,
        monthlyTrends,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addBudget,
        updateBudget,
        deleteBudget,
        setSettings,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinance = () => useContext(FinanceContext)
