import React from 'react';
import { motion } from 'framer-motion';

const HeatmapLegend = () => {
  const legendItems = [
    { color: '#ff0000', label: 'Critical', range: '>85%' },
    { color: '#ff4444', label: 'High', range: '70-85%' },
    { color: '#ffaa44', label: 'Medium', range: '50-70%' },
    { color: '#44ff44', label: 'Low', range: '<50%' },
  ];

  const iconItems = [
    { icon: '🟢', label: 'Entry Points', color: '#4ade80' },
    { icon: '🔵', label: 'Emergency Centers', color: '#3b82f6' },
    { icon: '📦', label: 'Zone Boundaries', color: '#ffffff' },
  ];

  return (
    <motion.div
      className="heatmap-legend"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Heat Scale */}
      <div className="legend-section">
        <h3 className="legend-title">🌡️ Heat Scale</h3>
        <div className="legend-items">
          {legendItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="legend-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div
                className="legend-color-box"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-label">{item.label}</span>
              <span className="legend-range">{item.range}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Icons */}
      <div className="legend-section">
        <h3 className="legend-title">🗺️ Map Icons</h3>
        <div className="legend-items">
          {iconItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="legend-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <span className="legend-icon">{item.icon}</span>
              <span className="legend-label">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="legend-section legend-tips">
        <h3 className="legend-title">💡 Tips</h3>
        <ul className="legend-tips-list">
          <li>Click zones to view details</li>
          <li>Hover for quick stats</li>
          <li>Use filters for focused view</li>
        </ul>
      </div>

      {/* Real-time Indicator */}
      <div className="realtime-indicator">
        <motion.div
          className="realtime-pulse"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <span>Live Data</span>
      </div>
    </motion.div>
  );
};

export default HeatmapLegend;
