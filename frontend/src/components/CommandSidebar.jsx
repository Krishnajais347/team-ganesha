import React from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  Radio,
  BarChart3,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const CommandSidebar = ({ currentView, setCurrentView, collapsed, setCollapsed }) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview', color: 'cyan' },
    { id: 'heatmap', icon: Map, label: 'Live Heatmap', color: 'blue' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts Center', color: 'red' },
    { id: 'rfid', icon: Radio, label: 'RFID Registry', color: 'purple' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'green' },
    { id: 'settings', icon: Settings, label: 'System Settings', color: 'gray' },
    { id: 'users', icon: Users, label: 'User & Permissions', color: 'indigo' },
  ]

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ width: collapsed ? 80 : 240, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full bg-white border-r border-slate-200 flex flex-col relative z-30 shadow-xs"
    >
      {/* Logo / Title */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-center px-4 bg-slate-50/50">
        {!collapsed ? (
          <div className="text-center">
            <h1 className="text-cyan-700 font-extrabold text-lg tracking-wider">KUMBH</h1>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Command Center</p>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shadow-xs">
            <span className="text-cyan-700 font-bold text-sm">K</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full flex items-center gap-4 px-4 py-3 mb-1.5
                ${isActive 
                  ? 'bg-cyan-50/80 border-l-4 border-cyan-600 text-cyan-900 font-semibold shadow-xs' 
                  : 'border-l-4 border-transparent text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'}
                transition-all group
              `}
            >
              <Icon className={`
                w-5 h-5 transition-colors
                ${isActive ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-700'}
              `} />
              
              {!collapsed && (
                <span className={`
                  text-sm transition-colors
                  ${isActive ? 'text-cyan-900 font-semibold' : 'text-slate-600 group-hover:text-slate-900 font-medium'}
                `}>
                  {item.label}
                </span>
              )}
              
              {!collapsed && isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-2 h-2 rounded-full bg-cyan-600"
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 border-t border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </motion.div>
  )
}

export default CommandSidebar
