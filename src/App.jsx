import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Layout from './components/Layout/Layout'

import DashboardPage from './pages/Dashboard/DashboardPage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import TransactionsPage from './pages/Transactions/TransactionsPage'
import AnalyticsPage from './pages/Analytics/AnalyticsPage'
import BudgetsPage from './pages/Budgets/BudgetsPage'
import ReportsPage from './pages/Reports/ReportsPage'
import ProfilePage from './pages/Profile/ProfilePage'
import SettingsPage from './pages/Settings/SettingsPage'

import ProtectedRoute from './routes/ProtectedRoute'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { FinanceProvider } from './context/FinanceContext'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>
          <Layout>
            <Routes>

              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/budgets" element={<BudgetsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </Layout>

          <ToastContainer
            position="top-right"
            autoClose={2500}
            theme="colored"
          />
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}