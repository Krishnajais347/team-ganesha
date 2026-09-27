import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react'
import ZoneCard from '../widgets/ZoneCard'
import LiveActivityFeed from '../LiveActivityFeed'

const OverviewPage = ({ setSelectedZone }) => {
  const [kpiData, setKpiData] = useState({
    totalCrowd: 2847532,
    activeZones: 24,
    warningZones: 3,
    emergencies: 0
  })

  const [zones, setZones] = useState([
    { id: 1, name: 'Zone Alpha', capacity: 50000, current: 42500, status: 'warning', trend: 'up' },
    { id: 2, name: 'Zone Beta', capacity: 75000, current: 54000, status: 'safe', trend: 'down' },
    { id: 3, name: 'Zone Gamma', capacity: 60000, current: 58500, status: 'critical', trend: 'up' },
    { id: 4, name: 'Zone Delta', capacity: 45000, current: 28000, status: 'safe', trend: 'up' },
    { id: 5, name: 'Zone Epsilon', capacity: 80000, current: 61000, status: 'warning', trend: 'up' },
    { id: 6, name: 'Zone Zeta', capacity: 55000, current: 23000, status: 'safe', trend: 'down' },
    { id: 7, name: 'Zone Eta', capacity: 70000, current: 52000, status: 'safe', trend: 'up' },
    { id: 8, name: 'Zone Theta', capacity: 50000, current: 41000, status: 'warning', trend: 'up' },
  ])

  const kpiCards = [
    {
      id: 'crowd',
      title: 'Live Crowd Count',
      value: kpiData.totalCrowd.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'zones',
      title: 'Active Zones',
      value: kpiData.activeZones,
      change: '+2',
      trend: 'up',
      icon: MapPin,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'warnings',
      title: 'Warning/Critical Zones',
      value: kpiData.warningZones,
      change: '+1',
      trend: 'up',
      icon: AlertTriangle,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'emergencies',
      title: 'Active Emergencies',
      value: kpiData.emergencies,
      change: '0',
      trend: 'neutral',
      icon: Activity,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Global KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => {
          const Icon = card.icon
          const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />
              
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl bg-${card.color}-50 border border-${card.color}-100`}>
                  <Icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
                {card.trend !== 'neutral' && (
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    card.trend === 'up' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'
                  }`}>
                    <TrendIcon className="w-3.5 h-3.5" />
                    {card.change}
                  </div>
                )}
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{card.value}</div>
              <div className="text-sm font-medium text-slate-500">{card.title}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Status Grid - Left 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Zone Status Overview</h2>
                <p className="text-xs text-slate-500 mt-0.5">Real-time capacity and occupancy metrics</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-emerald-700 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>Safe</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-amber-700 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg text-rose-700 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map((zone) => (
                <ZoneCard 
                  key={zone.id} 
                  zone={zone} 
                  onClick={() => setSelectedZone(zone)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Activity Feed - Right 1/3 */}
        <div className="lg:col-span-1">
          <LiveActivityFeed />
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
