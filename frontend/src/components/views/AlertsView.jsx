import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle, XCircle, Clock, X, MapPin, Users, Calendar } from 'lucide-react'

const AlertsView = () => {
  const [filter, setFilter] = useState('all')
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'High Crowd Density in Zone A',
      message: 'Crowd density has exceeded safe threshold. Immediate attention required.',
      timestamp: '2 minutes ago',
      location: 'Zone A - Main Ghat',
      status: 'active',
      details: {
        currentCrowd: 8500,
        maxCapacity: 10000,
        riskLevel: 'High',
        entryRate: 200,
        exitRate: 150,
        recommendation: 'Consider restricting entry to prevent overcrowding'
      }
    },
    {
      id: 2,
      type: 'warning',
      title: 'RFID Reader Offline',
      message: 'RFID checkpoint #12 is not responding. Check connection.',
      timestamp: '15 minutes ago',
      location: 'Gate 3',
      status: 'active',
      details: {
        deviceId: 'RFID-012',
        lastActive: '15 minutes ago',
        affectedArea: 'Gate 3 - East Entry',
        technician: 'Assigned to Tech Team',
        recommendation: 'Immediate hardware check required'
      }
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System backup will begin at 11:00 PM tonight.',
      timestamp: '1 hour ago',
      location: 'System',
      status: 'scheduled',
      details: {
        scheduledTime: '11:00 PM',
        duration: '2 hours',
        affectedSystems: 'Database, Analytics',
        downtime: 'No expected downtime',
        recommendation: 'No action required'
      }
    },
    {
      id: 4,
      type: 'success',
      title: 'Incident Resolved',
      message: 'Medical emergency at Zone B has been resolved.',
      timestamp: '2 hours ago',
      location: 'Zone B',
      status: 'resolved',
      details: {
        incidentType: 'Medical Emergency',
        responseTime: '3 minutes',
        resolvedBy: 'Medical Team Alpha',
        patientStatus: 'Stable',
        recommendation: 'Incident closed'
      }
    },
  ])

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return { Icon: AlertTriangle, color: 'red' }
      case 'warning':
        return { Icon: XCircle, color: 'yellow' }
      case 'info':
        return { Icon: Info, color: 'blue' }
      case 'success':
        return { Icon: CheckCircle, color: 'green' }
      default:
        return { Icon: Clock, color: 'gray' }
    }
  }

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' }
        : alert
    ))
    alert(`Alert #${alertId} has been acknowledged!`)
  }

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert)
  }

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter)

  return (
    <div className="p-6 space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex gap-1.5 inline-flex shadow-xs">
        {['all', 'critical', 'warning', 'info', 'success'].map((type) => (
          <motion.button
            key={type}
            onClick={() => setFilter(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-xl capitalize text-sm font-bold transition-all cursor-pointer ${
              filter === type 
                ? 'bg-cyan-50 border border-cyan-200 text-cyan-800 shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {type}
          </motion.button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert, index) => {
          const { Icon, color } = getAlertIcon(alert.type)
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all ${
                color === 'red' ? 'border-l-4 border-l-rose-500' :
                color === 'yellow' ? 'border-l-4 border-l-amber-500' :
                color === 'blue' ? 'border-l-4 border-l-blue-500' :
                'border-l-4 border-l-emerald-500'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${
                  color === 'red' ? 'bg-rose-50 border border-rose-100 text-rose-600' :
                  color === 'yellow' ? 'bg-amber-50 border border-amber-100 text-amber-600' :
                  color === 'blue' ? 'bg-blue-50 border border-blue-100 text-blue-600' :
                  'bg-emerald-50 border border-emerald-100 text-emerald-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{alert.title}</h3>
                      <p className="text-sm font-medium text-slate-500">{alert.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        color === 'red' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        color === 'yellow' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {alert.status}
                      </span>
                      <p className="text-xs text-slate-400 font-medium mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed font-medium">{alert.message}</p>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleViewDetails(alert)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold border border-slate-200 transition-all cursor-pointer"
                    >
                      View Details
                    </motion.button>
                    {alert.status === 'active' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        Acknowledge
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl p-7 max-w-2xl w-full shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  {(() => {
                    const { Icon, color } = getAlertIcon(selectedAlert.type)
                    return (
                      <div className={`p-3.5 rounded-2xl ${
                        color === 'red' ? 'bg-rose-50 border border-rose-100 text-rose-600' :
                        color === 'yellow' ? 'bg-amber-50 border border-amber-100 text-amber-600' :
                        color === 'blue' ? 'bg-blue-50 border border-blue-100 text-blue-600' :
                        'bg-emerald-50 border border-emerald-100 text-emerald-600'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedAlert.title}</h2>
                    <p className="text-slate-500 mt-1 font-medium">{selectedAlert.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Alert Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    Location
                  </div>
                  <div className="text-slate-900 font-bold text-base">{selectedAlert.location}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    Timestamp
                  </div>
                  <div className="text-slate-900 font-bold text-base">{selectedAlert.timestamp}</div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6">
                <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-cyan-600" />
                  Detailed Telemetry Information
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedAlert.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm py-1 border-b border-slate-200/60 last:border-none">
                      <span className="text-slate-500 capitalize font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-slate-900 font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedAlert.status === 'active' && (
                  <button
                    onClick={() => {
                      handleAcknowledge(selectedAlert.id)
                      setSelectedAlert(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
                  >
                    Acknowledge Alert
                  </button>
                )}
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AlertsView
