import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, AlertTriangle, ChevronDown, Eye, EyeOff } from 'lucide-react';

const ControlPanel = ({ zones, selectedZone, filters, onFilterChange, onZoneSelect }) => {
  const getRiskLevel = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage > 85) return 'critical';
    if (percentage > 70) return 'high';
    if (percentage > 50) return 'medium';
    return 'low';
  };

  const getRiskColor = (level) => {
    const colors = {
      critical: '#ff0000',
      high: '#ff4444',
      medium: '#ffaa44',
      low: '#44ff44',
    };
    return colors[level] || '#44ff44';
  };

  return (
    <div className="control-panel">
      {/* Header */}
      <div className="control-panel-header">
        <h2>🎛️ Control Panel</h2>
      </div>

      {/* Filters Section */}
      <div className="control-section">
        <div className="control-section-title">
          <Filter size={18} />
          <span>Filters</span>
        </div>

        {/* Risk Level Filter */}
        <div className="filter-group">
          <label className="filter-label">Risk Level</label>
          <div className="filter-select-wrapper">
            <select
              value={filters.riskLevel}
              onChange={(e) => onFilterChange({ ...filters, riskLevel: e.target.value })}
              className="filter-select"
            >
              <option value="all">All Zones</option>
              <option value="critical">🔴 Critical</option>
              <option value="high">🟠 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <ChevronDown size={16} className="filter-select-icon" />
          </div>
        </div>

        {/* Toggles */}
        <div className="filter-toggles">
          <button
            className={`toggle-btn ${filters.showEntryPoints ? 'active' : ''}`}
            onClick={() =>
              onFilterChange({ ...filters, showEntryPoints: !filters.showEntryPoints })
            }
          >
            {filters.showEntryPoints ? <Eye size={16} /> : <EyeOff size={16} />}
            <span>Entry Points</span>
          </button>

          <button
            className={`toggle-btn ${filters.showEmergencyCenters ? 'active' : ''}`}
            onClick={() =>
              onFilterChange({
                ...filters,
                showEmergencyCenters: !filters.showEmergencyCenters,
              })
            }
          >
            {filters.showEmergencyCenters ? <Eye size={16} /> : <EyeOff size={16} />}
            <span>Emergency Centers</span>
          </button>
        </div>
      </div>

      {/* Zones List */}
      <div className="control-section">
        <div className="control-section-title">
          <MapPin size={18} />
          <span>Zones ({zones.length})</span>
        </div>

        <div className="zones-list">
          {zones.map(zone => {
            const riskLevel = getRiskLevel(zone.current, zone.capacity);
            const occupancy = ((zone.current / zone.capacity) * 100).toFixed(1);
            const isSelected = selectedZone?.id === zone.id;

            return (
              <motion.div
                key={zone.id}
                className={`zone-item ${isSelected ? 'selected' : ''} risk-${riskLevel}`}
                onClick={() => onZoneSelect(zone)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="zone-item-header">
                  <span className="zone-item-name">{zone.name}</span>
                  <span className={`zone-item-badge risk-${riskLevel}`}>
                    {riskLevel}
                  </span>
                </div>

                <div className="zone-item-stats">
                  <span className="zone-stat">
                    👥 {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}
                  </span>
                </div>

                {/* Capacity Bar */}
                <div className="capacity-bar">
                  <motion.div
                    className="capacity-bar-fill"
                    style={{ backgroundColor: getRiskColor(riskLevel) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancy}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="zone-item-occupancy">{occupancy}% Occupied</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Zone Details */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            className="control-section zone-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="control-section-title">
              <AlertTriangle size={18} />
              <span>Selected Zone</span>
            </div>

            <div className="zone-details-content">
              <h3 className="zone-details-name">{selectedZone.name}</h3>

              <div className="zone-details-stats">
                <div className="zone-detail-item">
                  <span className="zone-detail-label">Current Crowd</span>
                  <span className="zone-detail-value">
                    {selectedZone.current.toLocaleString()}
                  </span>
                </div>

                <div className="zone-detail-item">
                  <span className="zone-detail-label">Capacity</span>
                  <span className="zone-detail-value">
                    {selectedZone.capacity.toLocaleString()}
                  </span>
                </div>

                <div className="zone-detail-item">
                  <span className="zone-detail-label">Occupancy</span>
                  <span className="zone-detail-value">
                    {((selectedZone.current / selectedZone.capacity) * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="zone-detail-item">
                  <span className="zone-detail-label">Risk Level</span>
                  <span
                    className={`zone-detail-value risk-${getRiskLevel(
                      selectedZone.current,
                      selectedZone.capacity
                    )}`}
                  >
                    {getRiskLevel(selectedZone.current, selectedZone.capacity).toUpperCase()}
                  </span>
                </div>

                <div className="zone-detail-item">
                  <span className="zone-detail-label">Entry Points</span>
                  <span className="zone-detail-value">{selectedZone.entryPoints}</span>
                </div>

                <div className="zone-detail-item">
                  <span className="zone-detail-label">Emergency Centers</span>
                  <span className="zone-detail-value">{selectedZone.emergencyCenters}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="zone-actions">
                <button className="zone-action-btn primary">
                  📊 View Analytics
                </button>
                <button className="zone-action-btn secondary">
                  🚨 Alert Admin
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlPanel;
