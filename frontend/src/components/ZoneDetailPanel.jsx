import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, Users, ArrowUpRight, ArrowDownRight, AlertTriangle, Lock, Radio, Phone } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const ZoneDetailPanel = ({ zone, onClose }) => {
  // Mock data for last 15 minutes
  const crowdData = zone ? [
    { time: '14:45', count: 38000 },
    { time: '14:48', count: 39500 },
    { time: '14:51', count: 41000 },
    { time: '14:54', count: 42500 },
    { time: '14:57', count: zone.current },
  ] : []

  const aiPrediction = zone ? {
    next10min: Math.floor(zone.current * 1.08),
    next15min: Math.floor(zone.current * 1.12),
    risk: zone.status === 'critical' ? 'High' : zone.status === 'warning' ? 'Medium' : 'Low'
  } : null

  return (
    <AnimatePresence>
      {zone && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[480px] bg-white border-l border-slate-200 z-50 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{zone.name}</h2>
                <p className="text-sm text-slate-500 mt-0.5">Live Zone Telemetry & Controls</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className={`
                p-5 rounded-2xl border-2
                ${zone.status === 'safe' ? 'bg-emerald-50/70 border-emerald-300' : ''}
                ${zone.status === 'warning' ? 'bg-amber-50/70 border-amber-300' : ''}
                ${zone.status === 'critical' ? 'bg-rose-50/70 border-rose-300' : ''}
              `}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">Current Status</span>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${zone.status === 'safe' ? 'bg-emerald-600 text-white' : ''}
                    ${zone.status === 'warning' ? 'bg-amber-500 text-white' : ''}
                    ${zone.status === 'critical' ? 'bg-rose-600 text-white' : ''}
                  `}>
                    {zone.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{zone.current.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">Current Crowd</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-400 tracking-tight">{zone.capacity.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">Max Capacity</div>
                  </div>
                </div>
              </div>

              {/* Entry/Exit Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Entry Rate</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">245/min</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">↑ 12% from avg</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ArrowDownRight className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Exit Rate</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">180/min</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">↓ 5% from avg</div>
                </div>
              </div>

              {/* Last 15 Minutes Chart */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Last 15 Minutes Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={crowdData}>
                    <XAxis 
                      dataKey="time" 
                      stroke="#94a3b8" 
                      style={{ fontSize: '11px', fontWeight: 500 }}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      style={{ fontSize: '11px', fontWeight: 500 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        color: '#0f172a'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#0891b2" 
                      strokeWidth={3}
                      dot={{ fill: '#0891b2', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* AI Prediction */}
              {aiPrediction && (
                <div className="bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/50 border border-purple-200 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-purple-950">AI Predictive Risk Forecast</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/70 px-3.5 py-2 rounded-xl border border-purple-100">
                      <span className="text-xs text-slate-600 font-medium">Next 10 minutes</span>
                      <span className="text-base font-extrabold text-slate-900">{aiPrediction.next10min.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/70 px-3.5 py-2 rounded-xl border border-purple-100">
                      <span className="text-xs text-slate-600 font-medium">Next 15 minutes</span>
                      <span className="text-base font-extrabold text-slate-900">{aiPrediction.next15min.toLocaleString()}</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">Risk Assessment</span>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-bold
                          ${aiPrediction.risk === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-300' : ''}
                          ${aiPrediction.risk === 'Medium' ? 'bg-amber-100 text-amber-800 border border-amber-300' : ''}
                          ${aiPrediction.risk === 'Low' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : ''}
                        `}>
                          {aiPrediction.risk} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Immediate Tactical Actions</h3>
                
                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer">
                  <Lock className="w-5 h-5" />
                  Block Zone Entry
                </button>

                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer">
                  <AlertTriangle className="w-5 h-5" />
                  Send Alert to Ground Staff
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    Call Police
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                    <Radio className="w-4 h-4 text-purple-600" />
                    Medical Team
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ZoneDetailPanel
