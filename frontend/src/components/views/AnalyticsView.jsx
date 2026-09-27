import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Activity,
  MapPin,
  Calendar,
  Clock,
  Download,
  Filter,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  ChevronDown,
  FileText,
  FileSpreadsheet
} from 'lucide-react';

// Generate sample data for charts
const generateCrowdData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      crowd: Math.floor(Math.random() * 800) + 400,
      expected: Math.floor(Math.random() * 700) + 500,
    });
  }
  return data;
};

const generateZoneData = () => {
  return [
    { zone: 'Gate 1', current: 460, capacity: 500, percentage: 92 },
    { zone: 'Gate 2', current: 320, capacity: 400, percentage: 80 },
    { zone: 'Gate 3', current: 241, capacity: 350, percentage: 69 },
    { zone: 'Sangam Ghat', current: 672, capacity: 800, percentage: 84 },
    { zone: 'Ram Ghat', current: 534, capacity: 600, percentage: 89 },
    { zone: 'Hanuman Ghat', current: 400, capacity: 500, percentage: 80 },
    { zone: 'Sector A', current: 690, capacity: 1000, percentage: 69 },
    { zone: 'Sector B', current: 1008, capacity: 1200, percentage: 84 },
    { zone: 'Sector C', current: 684, capacity: 900, percentage: 76 },
    { zone: 'Sector D', current: 520, capacity: 800, percentage: 65 },
    { zone: 'Sector E', current: 546, capacity: 700, percentage: 78 },
  ];
};

export default function AnalyticsView() {
  const [crowdData, setCrowdData] = useState(generateCrowdData());
  const [zoneData, setZoneData] = useState(generateZoneData());
  const [dateFilter, setDateFilter] = useState('today');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedZone, setSelectedZone] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Calculate key insights
  const peakHour = crowdData.reduce((max, item) => item.crowd > max.crowd ? item : max, crowdData[0]);
  const avgDensity = Math.floor(zoneData.reduce((sum, zone) => sum + zone.percentage, 0) / zoneData.length);
  const totalVisitors = zoneData.reduce((sum, zone) => sum + zone.current, 0);
  const highRiskZones = zoneData.filter(zone => zone.percentage > 85).length;

  const handleExport = (format) => {
    if (format === 'csv') {
      alert('Exporting analytics data as CSV...');
    } else if (format === 'pdf') {
      alert('Generating PDF report...');
    }
    setShowExportMenu(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-3 tracking-tight">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                <BarChart3 className="w-7 h-7" />
              </div>
              Analytics & Telemetry Dashboard
            </h1>
            <p className="text-slate-500 font-medium text-sm">Live and historical crowd density, demographic, and throughput behavior insights</p>
          </div>
          
          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export Report
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-slate-800 font-semibold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  Export as CSV (.csv)
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors text-slate-800 font-semibold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-rose-600" />
                  Export as PDF Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-600" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-cyan-600 focus:bg-white"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-cyan-600 focus:bg-white"
            >
              <option value="1h">Last 1 Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-600" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-cyan-600 focus:bg-white"
            >
              <option value="all">All Zones & Ghats</option>
              <option value="gates">Gates Only</option>
              <option value="ghats">Ghats Only</option>
              <option value="sectors">Sectors Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Visitors</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalVisitors.toLocaleString()}</div>
          <div className="text-xs font-semibold text-emerald-600 mt-1">↑ 12% from yesterday</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Peak Hour</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{peakHour.time}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">{peakHour.crowd} visitors/hr</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Density</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{avgDensity}%</div>
          <div className="text-xs font-semibold text-amber-600 mt-1">Moderate congestion</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-500" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">High-Risk Zones</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{highRiskZones}</div>
          <div className="text-xs font-semibold text-rose-600 mt-1">Immediate diversion recommended</div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Trends */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            Visitor Density Flow
          </h2>
          <p className="text-xs font-medium text-slate-500 mb-4">Real-time visitor throughput telemetry</p>
          
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 256">
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 64} x2="800" y2={i * 64} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              ))}
              <text x="5" y="20" fill="#94a3b8" fontSize="11" fontWeight="500">1600</text>
              <text x="5" y="84" fill="#94a3b8" fontSize="11" fontWeight="500">1200</text>
              <text x="5" y="148" fill="#94a3b8" fontSize="11" fontWeight="500">800</text>
              <text x="5" y="212" fill="#94a3b8" fontSize="11" fontWeight="500">400</text>
              <text x="5" y="252" fill="#94a3b8" fontSize="11" fontWeight="500">0</text>
              <path
                d={crowdData.map((point, i) => {
                  const x = (i / crowdData.length) * 800;
                  const y = 256 - (point.crowd / 1600) * 256;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              {crowdData.filter((_, i) => i % 3 === 0).map((point, i) => (
                <text key={i} x={(i * 3 / crowdData.length) * 800} y="250" fill="#94a3b8" fontSize="10" textAnchor="middle">{point.time}</text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Demographics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Demographics & Inflow Wave
          </h2>
          <p className="text-xs font-medium text-slate-500 mb-4">Estimated cohort density distribution</p>
          
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 256">
              <path d="M 100 128 Q 200 50, 400 80 T 700 120 Q 750 150, 700 180 T 400 200 Q 200 220, 100 128" fill="none" stroke="url(#gradient2)" strokeWidth="3.5" />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="50%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
                <circle key={i} cx={x} cy={Math.sin(i * 0.8) * 60 + 128} r="5" fill="#9333ea" />
              ))}
              <text x="5" y="20" fill="#94a3b8" fontSize="11">1600</text>
              <text x="5" y="84" fill="#94a3b8" fontSize="11">1200</text>
              <text x="5" y="148" fill="#94a3b8" fontSize="11">800</text>
              <text x="5" y="212" fill="#94a3b8" fontSize="11">400</text>
              {['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'].map((label, i) => (
                <text key={i} x={(i / 11) * 700 + 50} y="250" fill="#94a3b8" fontSize="10" textAnchor="middle">{label}</text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Zone Analytics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Zone Telemetry Breakdown
          </h2>
          <p className="text-xs font-medium text-slate-500 mb-4">Area-wise crowd capacity saturation</p>
          
          <div className="space-y-3.5 max-h-64 overflow-y-auto pr-2">
            {zoneData.map((zone, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{zone.zone}</span>
                  <span className="text-slate-900 font-extrabold">{zone.percentage}% ({zone.current}/{zone.capacity})</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.percentage}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      zone.percentage > 85 ? 'bg-gradient-to-r from-rose-500 to-red-500' :
                      zone.percentage > 75 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                      'bg-gradient-to-r from-emerald-400 to-teal-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Time Analysis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            Temporal Peak Analysis
          </h2>
          <p className="text-xs font-medium text-slate-500 mb-4">Hourly volume aggregation curves</p>
          
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 256">
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 64} x2="800" y2={i * 64} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              ))}
              <path
                d={`M 0 256 ${crowdData.map((point, i) => {
                  const x = (i / crowdData.length) * 800;
                  const y = 256 - (point.crowd / 1600) * 256;
                  return `L ${x} ${y}`;
                }).join(' ')} L 800 256 Z`}
                fill="url(#gradient3)"
                opacity="0.15"
              />
              <path
                d={crowdData.map((point, i) => {
                  const x = (i / crowdData.length) * 800;
                  const y = 256 - (point.crowd / 1600) * 256;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="url(#gradient3)"
                strokeWidth="3.5"
              />
              <defs>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <text x="5" y="20" fill="#94a3b8" fontSize="11">1600</text>
              <text x="5" y="84" fill="#94a3b8" fontSize="11">1200</text>
              <text x="5" y="148" fill="#94a3b8" fontSize="11">800</text>
              <text x="5" y="212" fill="#94a3b8" fontSize="11">400</text>
              {['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'].map((label, i) => (
                <text key={i} x={(i / 11) * 750 + 25} y="250" fill="#94a3b8" fontSize="10" textAnchor="middle">{label}</text>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
          AI Key Insights & Patterns
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Most Congested Zone</div>
            <div className="text-xl font-extrabold text-slate-900">Sector B - Central</div>
            <div className="text-xs font-semibold text-amber-600 mt-1">84% capacity (1008/1200 visitors)</div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recurring Risk Pattern</div>
            <div className="text-xl font-extrabold text-slate-900">14:00 - 16:00 IST</div>
            <div className="text-xs font-semibold text-rose-600 mt-1">Daily peak congestion window</div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended Action</div>
            <div className="text-xl font-extrabold text-slate-900">Redistribute Flow</div>
            <div className="text-xs font-semibold text-cyan-700 mt-1">Redirect to Sector A (69% capacity)</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
