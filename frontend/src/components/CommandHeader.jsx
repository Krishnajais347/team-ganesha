import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Wifi, Shield, User, Circle, LogOut } from 'lucide-react'

const CommandHeader = ({ currentUser, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemHealth, setSystemHealth] = useState('operational') // operational, degraded, critical

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getHealthColor = () => {
    switch(systemHealth) {
      case 'operational': return 'text-emerald-600'
      case 'degraded': return 'text-amber-600'
      case 'critical': return 'text-rose-600'
      default: return 'text-slate-500'
    }
  }

  const getHealthBgColor = () => {
    switch(systemHealth) {
      case 'operational': return 'bg-emerald-50 border border-emerald-200'
      case 'degraded': return 'bg-amber-50 border border-amber-200'
      case 'critical': return 'bg-rose-50 border border-rose-200'
      default: return 'bg-slate-100 border border-slate-200'
    }
  }

  return (
    <div className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 shadow-xs relative z-20">
      {/* Left: Live Clock */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-100">
            <Clock className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <div className="text-slate-800 font-mono text-lg font-bold tracking-tight">
              {currentTime.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
              })}
            </div>
            <div className="text-slate-500 text-xs font-medium">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-xs">
          <Wifi className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Live Telemetry</span>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500"
          />
        </div>
      </div>

      {/* Center: System Health */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${getHealthBgColor()}`}>
          <Shield className={`w-5 h-5 ${getHealthColor()}`} />
        </div>
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">System Status</div>
          <div className={`text-sm font-bold uppercase tracking-wide ${getHealthColor()}`}>
            {systemHealth}
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full ${getHealthBgColor()}`}>
          <Circle className={`w-2.5 h-2.5 ${getHealthColor()} fill-current`} />
        </div>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm text-slate-900 font-bold">{currentUser?.name || 'Super Admin'}</div>
          <div className="text-xs text-slate-500 font-medium">{currentUser?.role || 'Admin Authority'}</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shadow-xs">
          <User className="w-5 h-5 text-cyan-600" />
        </div>
        <button
          onClick={onLogout}
          className="ml-2 p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-all shadow-xs group"
          title="Logout"
        >
          <LogOut className="w-4 h-4 text-rose-600 group-hover:text-rose-700" />
        </button>
      </div>
    </div>
  )
}

export default CommandHeader
