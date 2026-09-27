import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

const ZoneCard = ({ zone, onClick }) => {
  const getStatusColor = () => {
    switch(zone.status) {
      case 'safe': return 'green'
      case 'warning': return 'yellow'
      case 'critical': return 'red'
      default: return 'gray'
    }
  }

  const getStatusBg = () => {
    switch(zone.status) {
      case 'safe': return 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/5'
      case 'warning': return 'border-amber-200 hover:border-amber-400 hover:shadow-amber-500/5'
      case 'critical': return 'border-rose-200 hover:border-rose-400 hover:shadow-rose-500/5'
      default: return 'border-slate-200 hover:border-slate-300'
    }
  }

  const percentage = (zone.current / zone.capacity) * 100
  const TrendIcon = zone.trend === 'up' ? TrendingUp : TrendingDown

  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-white border-2 ${getStatusBg()}
        rounded-xl p-4 cursor-pointer shadow-xs hover:shadow-md
        transition-all
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-slate-900 font-bold text-base">{zone.name}</h3>
          <div className="text-xs text-slate-500 mt-0.5 font-medium">
            {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()} visitors
          </div>
        </div>
        <div className={`
          px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border
          ${zone.status === 'safe' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
          ${zone.status === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
          ${zone.status === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
        `}>
          {zone.status}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              zone.status === 'safe' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : ''
            } ${
              zone.status === 'warning' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : ''
            } ${
              zone.status === 'critical' ? 'bg-gradient-to-r from-rose-500 to-red-500' : ''
            }`}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs font-semibold text-slate-600">{percentage.toFixed(1)}% Capacity</span>
          <div className="flex items-center gap-1">
            <TrendIcon className={`w-3.5 h-3.5 ${
              zone.trend === 'up' ? 'text-rose-600' : 'text-emerald-600'
            }`} />
            <span className={`text-xs font-semibold ${
              zone.trend === 'up' ? 'text-rose-600' : 'text-emerald-600'
            }`}>
              {zone.trend === 'up' ? 'Rising' : 'Falling'}
            </span>
          </div>
        </div>
      </div>

      {/* Alert Badge if Critical */}
      {zone.status === 'critical' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-lg font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Immediate crowd diversion required</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ZoneCard
