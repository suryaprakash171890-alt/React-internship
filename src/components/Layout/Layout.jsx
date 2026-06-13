import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { FiMenu, FiMoon, FiSun, FiLogOut, FiBarChart2, FiCreditCard, FiPieChart, FiUser } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Dashboard', icon: FiBarChart2 },
  { to: '/transactions', label: 'Transactions', icon: FiCreditCard },
  { to: '/analytics', label: 'Analytics', icon: FiPieChart },
  { to: '/budgets', label: 'Budgets', icon: FiBarChart2 },
  { to: '/reports', label: 'Reports', icon: FiPieChart },
  { to: '/profile', label: 'Profile', icon: FiUser },
]

export default function Layout({ children }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="md:flex">
        <aside className={`duration-300 md:w-72 ${open ? 'w-72' : 'w-20'} bg-slate-900 border-r border-slate-800 min-h-screen`}> 
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="space-y-1">
              <p className="text-lg font-semibold">ExpenseAI</p>
              <p className="text-xs text-slate-500">Finance Dashboard</p>
            </div>
            <button onClick={()=>setOpen(!open)} className="text-slate-300"><FiMenu /></button>
          </div>
          <nav className="p-4 space-y-1">
            {links.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.to} to={item.to} className="group block rounded-3xl px-4 py-3 text-slate-200 hover:bg-slate-800 hover:text-white">
                  <div className="flex items-center gap-3">
                    <Icon className="text-lg" />
                    <span className="hidden md:inline">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>
        <main className="flex-1 p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Welcome back{user ? `, ${user.name || 'User'}` : ''}</h1>
              <p className="text-slate-400">Manage your daily finances with insights, budgets, and analytics.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={toggleTheme} className="inline-flex items-center gap-2 rounded-2xl bg-slate-800 px-4 py-2 text-slate-100 hover:bg-slate-700">
                {theme === 'dark' ? <FiSun /> : <FiMoon />} {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
              {user && (
                <button onClick={() => { logout(); navigate('/login') }} className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-4 py-2 text-white hover:bg-rose-400">
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
