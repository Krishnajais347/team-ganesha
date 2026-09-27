import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Ban, 
  CheckCircle, 
  Bell, 
  X, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap 
} from 'lucide-react';

// Simulated zones data
const ZONES_DATA = [
  // Gates
  { id: 'gate-1', name: 'Gate 1 - Main Entry', type: 'gate', x: 15, y: 20, current: 4500, max: 5000, entry: 150, exit: 80 },
  { id: 'gate-2', name: 'Gate 2 - East Entry', type: 'gate', x: 85, y: 25, current: 3200, max: 4000, entry: 120, exit: 90 },
  { id: 'gate-3', name: 'Gate 3 - West Entry', type: 'gate', x: 15, y: 75, current: 2800, max: 4000, entry: 100, exit: 110 },
  
  // Ghats
  { id: 'ghat-1', name: 'Sangam Ghat', type: 'ghat', x: 50, y: 50, current: 8500, max: 10000, entry: 200, exit: 150 },
  { id: 'ghat-2', name: 'Ram Ghat', type: 'ghat', x: 65, y: 60, current: 6200, max: 7000, entry: 180, exit: 120 },
  { id: 'ghat-3', name: 'Hanuman Ghat', type: 'ghat', x: 35, y: 40, current: 4800, max: 6000, entry: 140, exit: 100 },
  
  // Sectors
  { id: 'sector-1', name: 'Sector A - North', type: 'sector', x: 50, y: 20, current: 3500, max: 5000, entry: 80, exit: 60 },
  { id: 'sector-2', name: 'Sector B - Central', type: 'sector', x: 50, y: 35, current: 5200, max: 6000, entry: 110, exit: 85 },
  { id: 'sector-3', name: 'Sector C - South', type: 'sector', x: 50, y: 70, current: 4100, max: 5500, entry: 95, exit: 70 },
  { id: 'sector-4', name: 'Sector D - East', type: 'sector', x: 70, y: 45, current: 2900, max: 4500, entry: 70, exit: 55 },
  { id: 'sector-5', name: 'Sector E - West', type: 'sector', x: 30, y: 55, current: 3800, max: 5000, entry: 90, exit: 75 },
];

const getRiskLevel = (current, max) => {
  const percentage = (current / max) * 100;
  if (percentage >= 90) return { level: 'critical', color: '#e11d48', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Critical' };
  if (percentage >= 75) return { level: 'warning', color: '#d97706', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Warning' };
  return { level: 'safe', color: '#059669', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Safe' };
};

const getZoneSize = (type) => {
  switch(type) {
    case 'gate': return 44;
    case 'ghat': return 64;
    case 'sector': return 54;
    default: return 48;
  }
};

export default function HeatmapView() {
  const [zones, setZones] = useState(ZONES_DATA);
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev => prev.map(zone => ({
        ...zone,
        current: Math.max(0, zone.current + Math.floor(Math.random() * 200 - 100)),
        entry: Math.max(0, zone.entry + Math.floor(Math.random() * 20 - 10)),
        exit: Math.max(0, zone.exit + Math.floor(Math.random() * 20 - 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate historical data for selected zone
  useEffect(() => {
    if (selectedZone) {
      const data = [];
      const now = Date.now();
      for (let i = 30; i >= 0; i--) {
        data.push({
          time: new Date(now - i * 60000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          count: Math.floor(selectedZone.current * (0.7 + Math.random() * 0.3))
        });
      }
      setHistoricalData(data);
    }
  }, [selectedZone]);

  const handleBlockEntry = (zoneId) => {
    alert(`Entry BLOCKED for ${zones.find(z => z.id === zoneId)?.name}`);
  };

  const handleAllowEntry = (zoneId) => {
    alert(`Entry ALLOWED for ${zones.find(z => z.id === zoneId)?.name}`);
  };

  const handleSendAlert = (zoneId) => {
    alert(`Alert SENT for ${zones.find(z => z.id === zoneId)?.name}`);
  };

  return (
    <div className="w-full h-screen bg-slate-50 relative overflow-hidden select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/85 backdrop-blur-xl border-b border-slate-200/90 px-6 py-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <MapPin className="w-6 h-6 text-cyan-600" />
              Live Crowd Heatmap
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">Real-time geospatial crowd density & checkpoint monitoring</p>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Safe (&lt;75%)
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Warning (75-90%)
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Critical (&gt;90%)
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="absolute inset-0 pt-20 pb-20 px-6">
        <div className="relative w-full h-full bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="light-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(203,213,225,0.7)" strokeWidth="0.4"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#light-grid)" />
            </svg>
          </div>

          {/* Zones */}
          {zones.map((zone) => {
            const risk = getRiskLevel(zone.current, zone.max);
            const size = getZoneSize(zone.type);
            const percentage = (zone.current / zone.max) * 100;

            return (
              <motion.div
                key={zone.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                whileHover={{ scale: 1.12 }}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => setSelectedZone(zone)}
              >
                {/* Zone Circle */}
                <motion.div
                  className="relative rounded-full flex items-center justify-center shadow-md transition-shadow"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `${risk.color}25`,
                    border: `2.5px solid ${risk.color}`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 12px ${risk.color}40`,
                      `0 0 24px ${risk.color}70`,
                      `0 0 12px ${risk.color}40`
                    ]
                  }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <Users className="w-4 h-4 text-slate-800" />
                  
                  {/* Percentage Badge */}
                  <div 
                    className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full text-[11px] font-extrabold flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: risk.color }}
                  >
                    {Math.round(percentage)}%
                  </div>
                </motion.div>

                {/* Zone Label */}
                <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 border border-slate-200/90 shadow-xs">
                    {zone.name}
                  </div>
                </div>

                {/* Pulse Animation for Critical Zones */}
                {risk.level === 'critical' && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${risk.color}` }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredZone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${hoveredZone.x}%`,
                  top: `${hoveredZone.y - 12}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl p-4 shadow-xl min-w-[240px] text-slate-900">
                  <h3 className="text-slate-900 font-bold text-sm mb-2">{hoveredZone.name}</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Current Crowd:</span>
                      <span className="text-slate-900 font-bold">{hoveredZone.current.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Capacity:</span>
                      <span className="text-slate-900 font-semibold">{hoveredZone.max.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Risk Level:</span>
                      <span 
                        className="font-bold uppercase text-[11px]"
                        style={{ color: getRiskLevel(hoveredZone.current, hoveredZone.max).color }}
                      >
                        {getRiskLevel(hoveredZone.current, hoveredZone.max).label}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-1.5 mt-1.5">
                      <span className="text-slate-500 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-emerald-600" /> Inflow:
                      </span>
                      <span className="text-emerald-700 font-bold">{hoveredZone.entry}/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3 text-rose-600" /> Outflow:
                      </span>
                      <span className="text-rose-700 font-bold">{hoveredZone.exit}/min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Side Panel Drawer */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 bottom-0 w-[420px] bg-white/95 backdrop-blur-xl border-l border-slate-200 z-50 overflow-y-auto shadow-2xl text-slate-900"
          >
            {/* Panel Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-white z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{selectedZone.name}</h2>
                  <p className="text-cyan-100 text-xs mt-0.5 capitalize">{selectedZone.type} Zone Details</p>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Current Status */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h3 className="text-slate-900 font-bold text-sm mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  Live Status
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                    <div className="text-slate-500 text-[11px] mb-0.5">Crowd Count</div>
                    <div className="text-xl font-bold text-slate-900">{selectedZone.current.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                    <div className="text-slate-500 text-[11px] mb-0.5">Capacity Limit</div>
                    <div className="text-xl font-bold text-slate-900">{selectedZone.max.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                    <div className="text-slate-500 text-[11px] mb-0.5">Utilization</div>
                    <div className="text-xl font-bold text-cyan-700">
                      {Math.round((selectedZone.current / selectedZone.max) * 100)}%
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                    <div className="text-slate-500 text-[11px] mb-0.5">Risk Level</div>
                    <div 
                      className="text-base font-bold"
                      style={{ color: getRiskLevel(selectedZone.current, selectedZone.max).color }}
                    >
                      {getRiskLevel(selectedZone.current, selectedZone.max).label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Flow Rates */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h3 className="text-slate-900 font-bold text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Flow Rates
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200/60">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      Entry Flow
                    </span>
                    <span className="text-emerald-700 font-bold">{selectedZone.entry} people/min</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200/60">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <ArrowDownRight className="w-4 h-4 text-rose-600" />
                      Exit Flow
                    </span>
                    <span className="text-rose-700 font-bold">{selectedZone.exit} people/min</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-100/80 rounded-lg">
                    <span className="text-slate-700 font-medium">Net Surge</span>
                    <span className={`font-bold ${selectedZone.entry - selectedZone.exit > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {selectedZone.entry - selectedZone.exit > 0 ? '+' : ''}{selectedZone.entry - selectedZone.exit} people/min
                    </span>
                  </div>
                </div>
              </div>

              {/* 30-Min Trend Graph */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h3 className="text-slate-900 font-bold text-sm mb-2">30-Min Historical Trend</h3>
                <div className="h-28 relative bg-white rounded-lg p-2 border border-slate-200/60">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="lightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0891b2" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(y => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(203,213,225,0.5)" strokeWidth="0.8" />
                    ))}
                    
                    {/* Trend line */}
                    <polyline
                      points={historicalData.map((d, i) => 
                        `${(i / (historicalData.length - 1)) * 300},${100 - (d.count / selectedZone.max) * 100}`
                      ).join(' ')}
                      fill="url(#lightGradient)"
                      stroke="#0891b2"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
                  <span>-30 min</span>
                  <span>Now</span>
                </div>
              </div>

              {/* AI Prediction */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                <h3 className="text-indigo-950 font-bold text-sm mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  AI Surge Prediction (Next 15 min)
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Projected Crowd:</span>
                    <span className="text-slate-900 font-bold">
                      {Math.round(selectedZone.current * 1.15).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Risk Trend:</span>
                    <span className="text-amber-700 font-bold">Elevating ⚠️</span>
                  </div>
                  <div className="mt-2 p-2.5 bg-white/80 rounded-lg border border-indigo-100">
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      ⚡ Inflow is outpacing outflow by 25%. Restricting entry gates recommended to prevent bottlenecking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Super Admin Actions */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h3 className="text-slate-900 font-bold text-sm mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  Zone Control Actions
                </h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleBlockEntry(selectedZone.id)}
                    className="w-full px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Ban className="w-4 h-4" />
                    Block Zone Entry Gates
                  </button>
                  
                  <button
                    onClick={() => handleAllowEntry(selectedZone.id)}
                    className="w-full px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Allow Unrestricted Entry
                  </button>
                  
                  <button
                    onClick={() => handleSendAlert(selectedZone.id)}
                    className="w-full px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Bell className="w-4 h-4" />
                    Dispatch Marshal Alert
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Bar (Bottom) */}
      <div className="absolute bottom-4 left-6 right-6 z-20 flex gap-4">
        <div className="flex-1 bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-xl p-3 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium mb-0.5">Safe Zones</div>
          <div className="text-xl font-bold text-emerald-700">
            {zones.filter(z => getRiskLevel(z.current, z.max).level === 'safe').length}
          </div>
        </div>
        <div className="flex-1 bg-white/90 backdrop-blur-xl border border-amber-200 rounded-xl p-3 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium mb-0.5">Warning Zones</div>
          <div className="text-xl font-bold text-amber-700">
            {zones.filter(z => getRiskLevel(z.current, z.max).level === 'warning').length}
          </div>
        </div>
        <div className="flex-1 bg-white/90 backdrop-blur-xl border border-rose-200 rounded-xl p-3 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium mb-0.5">Critical Zones</div>
          <div className="text-xl font-bold text-rose-700">
            {zones.filter(z => getRiskLevel(z.current, z.max).level === 'critical').length}
          </div>
        </div>
        <div className="flex-1 bg-white/90 backdrop-blur-xl border border-cyan-200 rounded-xl p-3 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium mb-0.5">Total Monitored Crowd</div>
          <div className="text-xl font-bold text-cyan-800">
            {zones.reduce((acc, z) => acc + z.current, 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
