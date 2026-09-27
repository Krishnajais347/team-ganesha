import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Download, Upload, Radio } from 'lucide-react'

const OperationsView = () => {
  const operations = [
    {
      id: 1,
      name: 'RFID System',
      status: 'running',
      uptime: '99.8%',
      lastUpdate: '2m ago',
      icon: Radio,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconColor: 'text-emerald-600 bg-emerald-50',
      barColor: 'from-emerald-500 to-teal-500'
    },
    {
      id: 2,
      name: 'Crowd Analytics',
      status: 'running',
      uptime: '100%',
      lastUpdate: '1m ago',
      icon: Radio,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'text-blue-600 bg-blue-50',
      barColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Alert Engine',
      status: 'paused',
      uptime: '95.2%',
      lastUpdate: '30m ago',
      icon: Radio,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      iconColor: 'text-amber-600 bg-amber-50',
      barColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 4,
      name: 'Data Sync',
      status: 'running',
      uptime: '98.5%',
      lastUpdate: '5m ago',
      icon: Radio,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'text-purple-600 bg-purple-50',
      barColor: 'from-purple-500 to-indigo-500'
    },
  ]

  const quickActions = [
    { icon: Download, label: 'Export Logs', color: 'text-blue-600 bg-blue-50 hover:bg-blue-100/70 border-blue-200' },
    { icon: Upload, label: 'Import Data', color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200' },
    { icon: RotateCcw, label: 'Restart Services', color: 'text-amber-600 bg-amber-50 hover:bg-amber-100/70 border-amber-200' },
    { icon: Pause, label: 'Pause All', color: 'text-rose-600 bg-rose-50 hover:bg-rose-100/70 border-rose-200' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer`}
          >
            <div className={`p-3 rounded-xl border ${action.color}`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-slate-800">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Operations Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operations.map((op, index) => (
          <motion.div
            key={op.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.2 }}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl border border-slate-100 ${op.iconColor}`}>
                  <op.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{op.name}</h3>
                  <p className="text-xs text-slate-500">Last update: {op.lastUpdate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${op.badgeColor}`}>
                {op.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Uptime</span>
                <span className="text-slate-900 font-bold">{op.uptime}</span>
              </div>
              
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: op.uptime }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className={`h-full bg-gradient-to-r ${op.barColor}`}
                />
              </div>

              <div className="flex gap-2 mt-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {op.status === 'running' ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      Resume
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Logs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs"
      >
        <h3 className="text-base font-bold text-slate-900 mb-4">Recent System Logs</h3>
        <div className="space-y-2 font-mono text-xs">
          {[
            { time: '14:32:45', level: 'INFO', message: 'RFID checkpoint sync completed successfully' },
            { time: '14:31:12', level: 'WARN', message: 'High latency detected in Zone C analytics' },
            { time: '14:29:03', level: 'INFO', message: 'Database backup completed' },
            { time: '14:25:18', level: 'ERROR', message: 'Failed to connect to external API, retrying...' },
          ].map((log, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/70 rounded-lg p-3 flex gap-4 items-center">
              <span className="text-slate-400 font-sans">{log.time}</span>
              <span className={`${
                log.level === 'ERROR' ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200' :
                log.level === 'WARN' ? 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200' :
                'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200'
              } font-bold text-[10px]`}>
                {log.level}
              </span>
              <span className="text-slate-700 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default OperationsView
