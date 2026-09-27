import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, AlertTriangle, Shield, Clock, Activity } from 'lucide-react'

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'rfid', icon: Radio, message: 'RFID scan: Entry at Gate 5', time: '2s ago', priority: 'low' },
    { id: 2, type: 'alert', icon: AlertTriangle, message: 'High density detected in Zone Alpha', time: '12s ago', priority: 'high' },
    { id: 3, type: 'action', icon: Shield, message: 'Admin: Blocked entry to Zone Gamma', time: '45s ago', priority: 'medium' },
    { id: 4, type: 'rfid', icon: Radio, message: 'RFID scan: Exit at Gate 12', time: '1m ago', priority: 'low' },
    { id: 5, type: 'alert', icon: AlertTriangle, message: 'Medical alert triggered at Zone Beta', time: '2m ago', priority: 'high' },
    { id: 6, type: 'action', icon: Shield, message: 'Police team dispatched to Zone Epsilon', time: '3m ago', priority: 'medium' },
    { id: 7, type: 'rfid', icon: Radio, message: 'RFID scan: Entry at Gate 3', time: '4m ago', priority: 'low' },
    { id: 8, type: 'system', icon: Activity, message: 'System health check completed', time: '5m ago', priority: 'low' },
  ])

  const getActivityColor = (type, priority) => {
    if (priority === 'high') return 'text-rose-600 border-rose-500'
    if (priority === 'medium') return 'text-amber-600 border-amber-500'
    if (type === 'rfid') return 'text-cyan-600 border-cyan-500'
    if (type === 'action') return 'text-purple-600 border-purple-500'
    return 'text-slate-600 border-slate-400'
  }

  const getActivityBg = (type, priority) => {
    if (priority === 'high') return 'bg-rose-50/60 border-l-4 border-rose-500'
    if (priority === 'medium') return 'bg-amber-50/60 border-l-4 border-amber-500'
    if (type === 'rfid') return 'bg-cyan-50/60 border-l-4 border-cyan-500'
    if (type === 'action') return 'bg-purple-50/60 border-l-4 border-purple-500'
    return 'bg-slate-50 border-l-4 border-slate-400'
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full flex flex-col shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Live Activity Feed</h2>
          <p className="text-xs text-slate-500 mt-0.5">Automated telemetry & dispatch stream</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500"
          />
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        <AnimatePresence>
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  ${getActivityBg(activity.type, activity.priority)}
                  rounded-xl p-3.5 border border-slate-200/60 hover:shadow-xs transition-all
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-white shadow-2xs">
                    <Icon className={`w-4 h-4 ${getActivityColor(activity.type, activity.priority).split(' ')[0]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
                      {activity.priority === 'high' && (
                        <span className="ml-auto text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Auto-refresh indicator */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <Activity className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
        <span>Auto-refreshing every 5 seconds</span>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.03);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

export default LiveActivityFeed
