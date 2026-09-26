import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OverviewPage from './views/OverviewPage'
import AnalyticsView from './views/AnalyticsView'
import AlertsView from './views/AlertsView'
import UserPermissionsView from './views/UserPermissionsView'
import HeatmapView from './views/HeatmapView'
import RFIDRegistryView from './views/RFIDRegistryView'
import SystemSettingsView from './views/SystemSettingsView'
import MacOSDock from './MacOSDock'

const DashboardController = ({ currentView, setCurrentView, setSelectedZone, onHeatmapClick }) => {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    // Load dashboard data from API or localStorage
    const loadDashboardData = async () => {
      try {
        // Simulated API call - replace with actual API
        const data = {
          kpis: {
            totalVisitors: 2847532,
            activeZones: 24,
            alertsActive: 3,
            systemHealth: 98.5
          },
          recentActivity: []
        }
        setDashboardData(data)
      } catch (error) {
        console.error('Failed to load dashboard:', error)
      }
    }
    
    loadDashboardData()
  }, [])

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewPage setSelectedZone={setSelectedZone} />
      case 'heatmap':
        return <HeatmapView />
      case 'alerts':
        return <AlertsView />
      case 'rfid':
        return <RFIDRegistryView />
      case 'analytics':
        return <AnalyticsView />
      case 'settings':
        return <SystemSettingsView />
      case 'users':
        return <UserPermissionsView />
      default:
        return <OverviewPage setSelectedZone={setSelectedZone} />
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* View Container with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={currentView === 'heatmap' ? 'h-full' : ''}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>

      {/* MacOS Dock */}
      <MacOSDock 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onHeatmapClick={onHeatmapClick}
      />
    </div>
  )
}

export default DashboardController
