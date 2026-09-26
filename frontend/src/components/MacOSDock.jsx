import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  Bell, 
  Settings, 
  Folder,
  Users,
  Zap,
  Activity,
  Map
} from 'lucide-react'

const MacOSDock = ({ currentView, setCurrentView, onHeatmapClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const dockRef = useRef(null)

  const dockItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'blue' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'purple' },
    { id: 'alerts', icon: Bell, label: 'Alerts', color: 'red' },
    { id: 'operations', icon: Activity, label: 'Operations', color: 'green' },
    { id: 'heatmap', icon: Map, label: 'Live Heatmap', color: 'cyan' },
    { id: 'divider', isDivider: true },
    { id: 'files', icon: Folder, label: 'Files', color: 'yellow' },
    { id: 'team', icon: Users, label: 'Team', color: 'pink' },
    { id: 'quick', icon: Zap, label: 'Quick Actions', color: 'orange' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'gray' },
  ]

  const getScale = (index) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.6
    if (distance === 1) return 1.3
    if (distance === 2) return 1.1
    return 1
  }

  const handleItemClick = (itemId) => {
    if (itemId && !dockItems.find(i => i.id === itemId)?.isDivider) {
      if (itemId === 'heatmap') {
        if (onHeatmapClick) onHeatmapClick()
      } else if (['dashboard', 'analytics', 'alerts', 'operations'].includes(itemId)) {
        setCurrentView(itemId)
      }
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        ref={dockRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
        className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 backdrop-blur-2xl border-2 border-white/50 rounded-2xl shadow-2xl px-4 py-3 flex items-end gap-2"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockItems.map((item, index) => {
          if (item.isDivider) {
            return (
              <div
                key={item.id}
                className="w-px h-12 bg-gray-300 mx-2"
              />
            )
          }

          const Icon = item.icon
          const scale = getScale(index)
          const isActive = currentView === item.id

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleItemClick(item.id)}
              className="relative group cursor-pointer"
              animate={{ 
                scale,
                y: hoveredIndex === index ? -10 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? -60 : -50
                }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
              >
                <div className="bg-gray-900 text-white px-3 py-1.5 text-xs font-medium rounded-lg shadow-lg">
                  {item.label}
                </div>
              </motion.div>

              {/* Icon Container */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center shadow-lg
                ${isActive ? 'shadow-xl ring-2 ring-white' : ''}
                ${item.color === 'blue' && 'bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600'}
                ${item.color === 'purple' && 'bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600'}
                ${item.color === 'red' && 'bg-gradient-to-br from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600'}
                ${item.color === 'green' && 'bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600'}
                ${item.color === 'cyan' && 'bg-gradient-to-br from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600'}
                ${item.color === 'yellow' && 'bg-gradient-to-br from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600'}
                ${item.color === 'pink' && 'bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600'}
                ${item.color === 'orange' && 'bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600'}
                ${item.color === 'gray' && 'bg-gradient-to-br from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600'}
                transition-all
              `}>
                <Icon className="w-6 h-6 text-white drop-shadow-lg" />
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeDockItem"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-900"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default MacOSDock
