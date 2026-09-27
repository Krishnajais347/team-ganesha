import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  MapPin,
  AlertTriangle,
  Users,
  Shield,
  Database,
  Save,
  Plus,
  Edit,
  Trash2,
  X,
  Lock,
  Unlock,
  Bell,
  Brain,
  Radio,
  Activity,
  Clock,
  FileText,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Initial zone data
const INITIAL_ZONES = [
  { id: 1, name: 'Gate 1 - Main Entry', type: 'gate', capacity: 5000, currentLimit: 4500, status: 'active' },
  { id: 2, name: 'Gate 2 - East Entry', type: 'gate', capacity: 4000, currentLimit: 3600, status: 'active' },
  { id: 3, name: 'Gate 3 - West Entry', type: 'gate', capacity: 4000, currentLimit: 3200, status: 'active' },
  { id: 4, name: 'Sangam Ghat', type: 'ghat', capacity: 10000, currentLimit: 9000, status: 'active' },
  { id: 5, name: 'Ram Ghat', type: 'ghat', capacity: 7000, currentLimit: 6300, status: 'active' },
  { id: 6, name: 'Hanuman Ghat', type: 'ghat', capacity: 6000, currentLimit: 5400, status: 'active' },
  { id: 7, name: 'Sector A - North', type: 'sector', capacity: 5000, currentLimit: 4500, status: 'active' },
  { id: 8, name: 'Sector B - Central', type: 'sector', capacity: 6000, currentLimit: 5500, status: 'active' },
  { id: 9, name: 'Sector C - South', type: 'sector', capacity: 5500, currentLimit: 5000, status: 'active' },
  { id: 10, name: 'Sector D - East', type: 'sector', capacity: 4500, currentLimit: 4000, status: 'active' },
  { id: 11, name: 'Sector E - West', type: 'sector', capacity: 5000, currentLimit: 4500, status: 'active' },
];

export default function SystemSettingsView() {
  const [activeTab, setActiveTab] = useState('zones');
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  
  // Alert Thresholds
  const [thresholds, setThresholds] = useState({
    safe: 75,
    warning: 85,
    critical: 95
  });

  // Feature Toggles
  const [features, setFeatures] = useState({
    aiPredictions: true,
    sosAlerts: true,
    realTimeMonitoring: true,
    autoAlerts: true,
    crowdAnalytics: true,
    rfidTracking: true
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    dataRetention: 90,
    anonymizeAfter: 30,
    logRetention: 180,
    autoDelete: true
  });

  // Zone Modal Form
  const [zoneForm, setZoneForm] = useState({
    name: '',
    type: 'sector',
    capacity: 0,
    currentLimit: 0
  });

  const handleAddZone = () => {
    setEditingZone(null);
    setZoneForm({ name: '', type: 'sector', capacity: 0, currentLimit: 0 });
    setShowZoneModal(true);
  };

  const handleEditZone = (zone) => {
    setEditingZone(zone);
    setZoneForm({
      name: zone.name,
      type: zone.type,
      capacity: zone.capacity,
      currentLimit: zone.currentLimit
    });
    setShowZoneModal(true);
  };

  const handleSaveZone = () => {
    if (editingZone) {
      setZones(zones.map(z => z.id === editingZone.id ? {
        ...z,
        name: zoneForm.name,
        type: zoneForm.type,
        capacity: parseInt(zoneForm.capacity),
        currentLimit: parseInt(zoneForm.currentLimit)
      } : z));
    } else {
      const newZone = {
        id: zones.length + 1,
        name: zoneForm.name,
        type: zoneForm.type,
        capacity: parseInt(zoneForm.capacity),
        currentLimit: parseInt(zoneForm.currentLimit),
        status: 'active'
      };
      setZones([...zones, newZone]);
    }
    setShowZoneModal(false);
  };

  const handleDeleteZone = (id) => {
    if (confirm('Are you sure you want to delete this zone?')) {
      setZones(zones.filter(z => z.id !== id));
    }
  };

  const handleSaveSettings = () => {
    alert('System settings saved successfully!');
  };

  return (
    <div className="p-6 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-cyan-600" />
            System Configuration
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">Control crowd safety thresholds, zone allocations, feature toggles, and compliance policies</p>
        </div>
        
        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl flex items-center gap-2 transition-all font-semibold text-sm shadow-xs"
        >
          <Save className="w-4 h-4" />
          Save Global Config
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: 'zones', label: 'Zone Management', icon: MapPin },
          { id: 'thresholds', label: 'Alert Thresholds', icon: AlertTriangle },
          { id: 'users', label: 'User Roles & Matrix', icon: Users },
          { id: 'features', label: 'Feature Toggles', icon: Activity },
          { id: 'privacy', label: 'Data Retention & Privacy', icon: Shield }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap text-xs ${
              activeTab === tab.id
                ? 'bg-cyan-50 border border-cyan-600 text-cyan-900 shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Zone Management Tab */}
      {activeTab === 'zones' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Perimeter & Zone Allocations</h2>
            <button
              onClick={handleAddZone}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2 text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add New Zone
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${
                    zone.type === 'gate' ? 'bg-blue-50 text-blue-600' :
                    zone.type === 'ghat' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-slate-900 font-bold text-sm">{zone.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{zone.type} Area</p>
                  </div>

                  <div className="text-center px-4 hidden md:block">
                    <div className="text-[11px] text-slate-400 font-medium mb-0.5">Capacity</div>
                    <div className="text-slate-900 font-bold text-sm">{zone.capacity.toLocaleString()}</div>
                  </div>

                  <div className="text-center px-4 hidden md:block">
                    <div className="text-[11px] text-slate-400 font-medium mb-0.5">Surge Limit</div>
                    <div className="text-cyan-700 font-bold text-sm">{zone.currentLimit.toLocaleString()}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {zone.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleEditZone(zone)}
                    className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-lg transition-all"
                    title="Edit Zone"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteZone(zone.id)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-all"
                    title="Delete Zone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Alert Thresholds Tab */}
      {activeTab === 'thresholds' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-lg font-bold text-slate-900">Crowd Density Breach Triggers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Safe Operating Level</h3>
              </div>
              <p className="text-slate-500 text-xs mb-4">Crowd density within baseline normal limits</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-500">Threshold Cap</span>
                  <span className="text-emerald-700 font-bold">{thresholds.safe}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.safe}
                  onChange={(e) => setThresholds({ ...thresholds, safe: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs">
                <div className="text-emerald-600 font-semibold mb-0.5">Status Mode</div>
                <div className="text-emerald-800 font-bold">Unrestricted Inflow Allowed</div>
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Warning Threshold</h3>
              </div>
              <p className="text-slate-500 text-xs mb-4">Elevated density requiring marshal mobilization</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-500">Warning Trigger</span>
                  <span className="text-amber-700 font-bold">{thresholds.warning}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.warning}
                  onChange={(e) => setThresholds({ ...thresholds, warning: parseInt(e.target.value) })}
                  className="w-full accent-amber-600"
                />
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                <div className="text-amber-600 font-semibold mb-0.5">Automated Action</div>
                <div className="text-amber-800 font-bold">Dispatch Marshal Alerts</div>
              </div>
            </div>

            <div className="bg-white border border-rose-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Critical Redline</h3>
              </div>
              <p className="text-slate-500 text-xs mb-4">High-risk bottleneck requiring immediate gate closure</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5 font-semibold">
                  <span className="text-slate-500">Critical Trigger</span>
                  <span className="text-rose-700 font-bold">{thresholds.critical}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.critical}
                  onChange={(e) => setThresholds({ ...thresholds, critical: parseInt(e.target.value) })}
                  className="w-full accent-rose-600"
                />
              </div>
              
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs">
                <div className="text-rose-600 font-semibold mb-0.5">Automated Action</div>
                <div className="text-rose-800 font-bold">Lock Entry Turnstiles & Siren</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Visual Density Range Spectrum</h3>
            <div className="relative h-10 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <div className="absolute inset-0 flex text-xs font-bold text-white">
                <div
                  style={{ width: `${thresholds.safe}%` }}
                  className="bg-emerald-500 flex items-center justify-center"
                >
                  Safe (0-{thresholds.safe}%)
                </div>
                <div
                  style={{ width: `${thresholds.warning - thresholds.safe}%` }}
                  className="bg-amber-500 flex items-center justify-center text-slate-900"
                >
                  Warning ({thresholds.safe}-{thresholds.warning}%)
                </div>
                <div
                  style={{ width: `${100 - thresholds.warning}%` }}
                  className="bg-rose-500 flex items-center justify-center"
                >
                  Critical ({thresholds.warning}%+)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* User & Role Management Tab */}
      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Command Roles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { role: 'Super Admin', users: 2, permissions: 'Full System Control & Audit' },
                { role: 'Live Management', users: 5, permissions: 'Heatmap, Zones & Alerts' },
                { role: 'Police Dashboard', users: 12, permissions: 'Emergency Deployment' },
                { role: 'Medical Dashboard', users: 8, permissions: 'Ambulance & Triage Dispatch' },
                { role: 'RFID Registry', users: 3, permissions: 'Wristband Tagging & Tracking' },
                { role: 'Operator Staff', users: 20, permissions: 'Checkpoints & Inflow Counting' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-slate-900 font-bold text-sm">{item.role}</h4>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                      {item.users} active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{item.permissions}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Role Access Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-bold text-slate-700">Permission Area</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Super Admin</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Live Mgmt</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Police</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-700">Medical</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['View Command Dashboard', true, true, true, true],
                    ['Manage Zones & Boundaries', true, false, false, false],
                    ['Send High-Priority Alerts', true, true, true, true],
                    ['View Full Analytics & Reports', true, true, false, false],
                    ['RFID Registry Control', true, true, false, false],
                    ['System Settings & Auth', true, false, false, false]
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{row[0]}</td>
                      {row.slice(1).map((val, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          {val ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Feature Controls Tab */}
      {activeTab === 'features' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-bold text-slate-900">Platform Subsystem Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'aiPredictions', label: 'AI Crowd Predictions', icon: Brain, description: 'Deep learning models predicting bottlenecks 15 mins in advance' },
              { id: 'sosAlerts', label: 'SOS Emergency Alerts', icon: Bell, description: 'Instant emergency broadcast trigger from field command units' },
              { id: 'realTimeMonitoring', label: 'Real-Time Monitoring', icon: Activity, description: 'Sub-second WebSocket crowd telemetry & heatmap sync' },
              { id: 'autoAlerts', label: 'Automated Threshold Alerts', icon: AlertTriangle, description: 'Trigger marshal response automatically upon threshold breach' },
              { id: 'crowdAnalytics', label: 'Crowd Historical Analytics', icon: TrendingUp, description: 'Deep historical inflow, outflow, and density reporting' },
              { id: 'rfidTracking', label: 'RFID Wristband Tracking', icon: Radio, description: 'Real-time pilgrim movement checkpoints and lost child locating' }
            ].map((feature) => (
              <div
                key={feature.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${features[feature.id] ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'bg-slate-100 text-slate-500'}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-sm">{feature.label}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setFeatures({ ...features, [feature.id]: !features[feature.id] })}
                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-3 ${
                      features[feature.id] ? 'bg-cyan-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
                      features[feature.id] ? 'left-6.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
                
                <div className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  features[feature.id] ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {features[feature.id] ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      Active Subsystem Online
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      Subsystem Offline / Paused
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Privacy & Data Tab */}
      {activeTab === 'privacy' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-lg font-bold text-slate-900">Data Governance & Compliance Policies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Data Retention Windows</h3>
              </div>
              
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between mb-1.5 font-semibold">
                    <span className="text-slate-500">Live Telemetry Storage</span>
                    <span className="text-slate-900 font-bold">{privacy.dataRetention} days</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="365"
                    value={privacy.dataRetention}
                    onChange={(e) => setPrivacy({ ...privacy, dataRetention: parseInt(e.target.value) })}
                    className="w-full accent-cyan-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1.5 font-semibold">
                    <span className="text-slate-500">PII Anonymization Schedule</span>
                    <span className="text-slate-900 font-bold">{privacy.anonymizeAfter} days</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="90"
                    value={privacy.anonymizeAfter}
                    onChange={(e) => setPrivacy({ ...privacy, anonymizeAfter: parseInt(e.target.value) })}
                    className="w-full accent-cyan-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1.5 font-semibold">
                    <span className="text-slate-500">Audit Log Archival</span>
                    <span className="text-slate-900 font-bold">{privacy.logRetention} days</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="730"
                    value={privacy.logRetention}
                    onChange={(e) => setPrivacy({ ...privacy, logRetention: parseInt(e.target.value) })}
                    className="w-full accent-cyan-600"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Compliance & Safeguards</h3>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <div>
                    <div className="text-slate-900 font-semibold mb-0.5">Automated Purge Routine</div>
                    <div className="text-slate-500 text-[11px]">Deletes expired visitor movement logs automatically</div>
                  </div>
                  <button
                    onClick={() => setPrivacy({ ...privacy, autoDelete: !privacy.autoDelete })}
                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-3 ${
                      privacy.autoDelete ? 'bg-cyan-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
                      privacy.autoDelete ? 'left-6.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
                    <FileText className="w-4 h-4" />
                    Regulatory Compliance Active
                  </div>
                  <div className="text-blue-800 text-[11px] leading-relaxed">
                    System complies with public safety telemetry and digital privacy protection directives for mega gatherings.
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800 font-semibold mb-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Next Automated Archival
                  </div>
                  <div className="text-amber-800 text-[11px]">
                    Scheduled maintenance window: Tonight at 02:00 AM IST
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Zone Modal */}
      <AnimatePresence>
        {showZoneModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowZoneModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-900"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingZone ? 'Edit Zone Parameter' : 'Register New Monitored Zone'}
                </h3>
                <button
                  onClick={() => setShowZoneModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Zone Identifier / Name</label>
                  <input
                    type="text"
                    value={zoneForm.name}
                    onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white"
                    placeholder="e.g. Gate 4 - VIP Entry"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Zone Classification</label>
                  <select
                    value={zoneForm.type}
                    onChange={(e) => setZoneForm({ ...zoneForm, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white"
                  >
                    <option value="gate">Gate (Entry / Exit Checkpoint)</option>
                    <option value="ghat">Ghat (Bathing / Waterfront)</option>
                    <option value="sector">Sector (Holding Area / Corridor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Maximum Structural Capacity</label>
                  <input
                    type="number"
                    value={zoneForm.capacity}
                    onChange={(e) => setZoneForm({ ...zoneForm, capacity: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Surge Alert Threshold Limit</label>
                  <input
                    type="number"
                    value={zoneForm.currentLimit}
                    onChange={(e) => setZoneForm({ ...zoneForm, currentLimit: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white"
                    placeholder="4500"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 mt-6">
                <button
                  onClick={() => setShowZoneModal(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveZone}
                  className="flex-1 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold text-xs transition-all shadow-xs"
                >
                  {editingZone ? 'Save Changes' : 'Create Zone'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
