import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, Tooltip } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ControlPanel from './ControlPanel';
import HeatmapLegend from './HeatmapLegend';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Mock zones data (Kumbh Mela layout)
const MOCK_ZONES = [
  {
    id: 1,
    name: 'Triveni Sangam Main',
    coordinates: [
      [25.435, 81.885],
      [25.438, 81.885],
      [25.438, 81.890],
      [25.435, 81.890],
    ],
    capacity: 50000,
    current: 42000,
    entryPoints: 8,
    emergencyCenters: 3,
  },
  {
    id: 2,
    name: 'Ghats Area',
    coordinates: [
      [25.430, 81.880],
      [25.434, 81.880],
      [25.434, 81.884],
      [25.430, 81.884],
    ],
    capacity: 30000,
    current: 18000,
    entryPoints: 5,
    emergencyCenters: 2,
  },
  {
    id: 3,
    name: 'Temple Complex',
    coordinates: [
      [25.440, 81.892],
      [25.443, 81.892],
      [25.443, 81.896],
      [25.440, 81.896],
    ],
    capacity: 25000,
    current: 12000,
    entryPoints: 4,
    emergencyCenters: 2,
  },
  {
    id: 4,
    name: 'Accommodation Zone',
    coordinates: [
      [25.428, 81.895],
      [25.431, 81.895],
      [25.431, 81.899],
      [25.428, 81.899],
    ],
    capacity: 20000,
    current: 15000,
    entryPoints: 3,
    emergencyCenters: 1,
  },
];

const HeatmapDashboard = ({ user, onLogout }) => {
  const [zones, setZones] = useState(MOCK_ZONES);
  const [selectedZone, setSelectedZone] = useState(null);
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    showEntryPoints: true,
    showEmergencyCenters: true,
  });
  const [realtimeData, setRealtimeData] = useState({});

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updates = {};
      zones.forEach(zone => {
        const variation = Math.floor(Math.random() * 1000) - 500;
        const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + variation));
        updates[zone.id] = { current: newCurrent };
      });
      setRealtimeData(updates);
    }, 2000);

    return () => clearInterval(interval);
  }, [zones]);

  // Get risk color based on occupancy
  const getRiskColor = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage > 85) return '#ff0000'; // Critical - Red
    if (percentage > 70) return '#ff4444'; // High - Orange-Red
    if (percentage > 50) return '#ffaa44'; // Medium - Orange
    return '#44ff44'; // Low - Green
  };

  // Get risk level text
  const getRiskLevel = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage > 85) return 'critical';
    if (percentage > 70) return 'high';
    if (percentage > 50) return 'medium';
    return 'low';
  };

  // Get zone data with real-time updates
  const getZoneData = (zone) => {
    if (realtimeData[zone.id]) {
      return { ...zone, ...realtimeData[zone.id] };
    }
    return zone;
  };

  // Filter zones by risk level
  const getFilteredZones = () => {
    if (filters.riskLevel === 'all') return zones;
    return zones.filter(zone => {
      const updatedZone = getZoneData(zone);
      return getRiskLevel(updatedZone.current, updatedZone.capacity) === filters.riskLevel;
    });
  };

  return (
    <div className="heatmap-dashboard">
      {/* Header */}
      <div className="heatmap-header">
        <div className="heatmap-header-left">
          <h1>🗺️ Live Crowd Heatmap</h1>
          <span className="heatmap-subtitle">Real-time monitoring</span>
        </div>
        <div className="heatmap-header-right">
          <span className="heatmap-user">👤 {user.name}</span>
          <button onClick={onLogout} className="heatmap-logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="heatmap-content">
        {/* Map Container */}
        <div className="map-wrapper">
          <MapContainer
            center={[25.435, 81.890]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render zones */}
            {getFilteredZones().map(zone => {
              const updatedZone = getZoneData(zone);
              const color = getRiskColor(updatedZone.current, updatedZone.capacity);
              const riskLevel = getRiskLevel(updatedZone.current, updatedZone.capacity);
              const occupancy = ((updatedZone.current / updatedZone.capacity) * 100).toFixed(1);

              return (
                <Polygon
                  key={zone.id}
                  positions={zone.coordinates}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.4,
                    weight: selectedZone?.id === zone.id ? 4 : 2,
                    className: riskLevel === 'critical' ? 'zone-critical-blink' : '',
                  }}
                  eventHandlers={{
                    click: () => setSelectedZone(updatedZone),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                    <div className="zone-tooltip">
                      <strong>{zone.name}</strong>
                      <div>👥 Crowd: {updatedZone.current.toLocaleString()}</div>
                      <div>📊 Capacity: {zone.capacity.toLocaleString()}</div>
                      <div>⚠️ Occupancy: {occupancy}%</div>
                      <div className={`risk-badge risk-${riskLevel}`}>
                        {riskLevel.toUpperCase()}
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
          </MapContainer>

          {/* Legend */}
          <HeatmapLegend />
        </div>

        {/* Control Panel */}
        <ControlPanel
          zones={zones.map(getZoneData)}
          selectedZone={selectedZone}
          filters={filters}
          onFilterChange={setFilters}
          onZoneSelect={setSelectedZone}
        />
      </div>
    </div>
  );
};

export default HeatmapDashboard;
