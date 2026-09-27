import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Search,
  Filter,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  AlertTriangle,
  X,
  RefreshCw,
  MapPin,
  Clock,
  UserPlus,
  Shield,
  Download,
  ChevronDown,
  Activity,
  User,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

// Generate RFID data from zones
const generateRFIDFromZones = () => {
  const zones = [
    { name: 'Gate 1 - Main Entry', capacity: 500, current: 460 },
    { name: 'Gate 2 - East Entry', capacity: 400, current: 320 },
    { name: 'Gate 3 - West Entry', capacity: 350, current: 241 },
    { name: 'Sangam Ghat', capacity: 800, current: 672 },
    { name: 'Ram Ghat', capacity: 600, current: 534 },
    { name: 'Hanuman Ghat', capacity: 500, current: 400 },
    { name: 'Sector A - North', capacity: 1000, current: 690 },
    { name: 'Sector B - Central', capacity: 1200, current: 1008 },
    { name: 'Sector C - South', capacity: 900, current: 684 },
    { name: 'Sector D - East', capacity: 800, current: 520 },
    { name: 'Sector E - West', capacity: 700, current: 546 }
  ];

  const names = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Verma', 'Sunita Devi', 'Vikram Singh',
    'Anjali Patel', 'Rahul Gupta', 'Deepika Reddy', 'Suresh Yadav', 'Kavita Singh',
    'Manoj Tiwari', 'Neha Mishra', 'Arun Kumar', 'Pooja Agarwal', 'Sanjay Pandey'
  ];

  const rfidData = [];
  let id = 1;

  zones.forEach((zone, zoneIndex) => {
    const numPeople = Math.floor(Math.random() * 3) + 2; // 2-4 people per zone
    
    for (let i = 0; i < numPeople; i++) {
      const uid = `RFID-2026-${String(id).padStart(3, '0')}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
      const maskedUid = `RFID-****-***${uid.slice(-3)}`;
      const randomName = names[Math.floor(Math.random() * names.length)];
      const isFlagged = Math.random() > 0.85;
      const status = isFlagged && Math.random() > 0.7 ? 'blocked' : Math.random() > 0.9 ? 'inactive' : 'active';
      
      const scanHistory = [];
      const numScans = Math.floor(Math.random() * 5) + 2;
      
      for (let j = 0; j < numScans; j++) {
        const randomZone = zones[Math.floor(Math.random() * zones.length)];
        scanHistory.push({
          zone: randomZone.name,
          timestamp: `${Math.floor(Math.random() * 60) + 1} mins ago`,
          type: j === 0 ? 'entry' : 'movement',
          flagged: isFlagged && j === 0
        });
      }

      rfidData.push({
        id,
        uid,
        maskedUid,
        status,
        assignedTo: randomName,
        phoneNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
        age: Math.floor(Math.random() * 50) + 20,
        address: `Delhi, India`,
        lastZone: zone.name,
        lastScan: new Date(Date.now() - Math.random() * 3600000).toLocaleString(),
        registeredDate: new Date(2026, 0, Math.floor(Math.random() * 6) + 1).toLocaleDateString(),
        totalScans: Math.floor(Math.random() * 200) + 50,
        flagged: isFlagged,
        flagReason: isFlagged ? (Math.random() > 0.5 ? 'Duplicate scans detected' : 'Suspicious movement pattern') : null,
        scanHistory
      });
      
      id++;
    }
  });

  return rfidData;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
    case 'inactive': return 'text-slate-600 bg-slate-100 border border-slate-200';
    case 'blocked': return 'text-rose-700 bg-rose-50 border border-rose-200';
    default: return 'text-slate-600 bg-slate-100 border border-slate-200';
  }
};

export default function RFIDRegistryView() {
  const [rfidList, setRfidList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedRFID, setSelectedRFID] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMasked, setShowMasked] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('rfid'); // 'rfid' or 'users'

  // Generate live data on mount and refresh every 30 seconds
  useEffect(() => {
    const updateData = () => {
      const liveData = generateRFIDFromZones();
      setRfidList(liveData);
    };

    updateData();
    const interval = setInterval(updateData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter RFIDs based on search and status
  useEffect(() => {
    let filtered = rfidList;

    if (searchQuery) {
      filtered = filtered.filter(rfid =>
        rfid.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfid.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(rfid => rfid.status === statusFilter);
    }

    setFilteredList(filtered);
  }, [searchQuery, statusFilter, rfidList]);

  const handleDisable = (rfidId) => {
    setRfidList(rfidList.map(rfid =>
      rfid.id === rfidId ? { ...rfid, status: 'blocked' } : rfid
    ));
    alert(`RFID ${rfidId} has been disabled`);
  };

  const handleEnable = (rfidId) => {
    setRfidList(rfidList.map(rfid =>
      rfid.id === rfidId ? { ...rfid, status: 'active' } : rfid
    ));
    alert(`RFID ${rfidId} has been enabled`);
  };

  const handleMarkSuspicious = (rfidId) => {
    setRfidList(rfidList.map(rfid =>
      rfid.id === rfidId ? { ...rfid, flagged: true, flagReason: 'Marked by Super Admin' } : rfid
    ));
    alert(`RFID ${rfidId} marked as suspicious`);
  };

  const handleReassign = (rfidId) => {
    const newName = prompt('Enter new assignee name:');
    if (newName) {
      setRfidList(rfidList.map(rfid =>
        rfid.id === rfidId ? { ...rfid, assignedTo: newName } : rfid
      ));
      alert(`RFID ${rfidId} reassigned to ${newName}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-3 tracking-tight">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                <Radio className="w-7 h-7" />
              </div>
              RFID Pilgrim Registry & Telemetry
            </h1>
            <p className="text-slate-500 font-medium text-sm">Live telemetry scan checkpoints across all Ghats and Gates • Updated in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 rounded-xl flex items-center gap-2 transition-all cursor-pointer">
              <Download className="w-4 h-4 text-slate-600" />
              Export Registry
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md shadow-cyan-600/20 cursor-pointer">
              <UserPlus className="w-4 h-4" />
              Register New RFID
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('rfid')}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'rfid'
              ? 'bg-cyan-50 border border-cyan-200 text-cyan-800 shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Radio className="w-4 h-4 text-cyan-600" />
          RFID Tracking
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'users'
              ? 'bg-cyan-50 border border-cyan-200 text-cyan-800 shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4 text-cyan-600" />
          Registered Pilgrims
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active RFIDs</div>
          <div className="text-3xl font-extrabold text-emerald-600 tracking-tight">
            {rfidList.filter(r => r.status === 'active').length}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-400" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Inactive RFIDs</div>
          <div className="text-3xl font-extrabold text-slate-700 tracking-tight">
            {rfidList.filter(r => r.status === 'inactive').length}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Blocked RFIDs</div>
          <div className="text-3xl font-extrabold text-rose-600 tracking-tight">
            {rfidList.filter(r => r.status === 'blocked').length}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Flagged Suspicious</div>
          <div className="text-3xl font-extrabold text-amber-600 tracking-tight">
            {rfidList.filter(r => r.flagged).length}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by RFID UID or pilgrim name..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white text-sm font-medium"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Filter className="w-4 h-4 text-cyan-600" />
              Filter: {statusFilter === 'all' ? 'All Status' : statusFilter}
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5">
                {['all', 'active', 'inactive', 'blocked'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors capitalize text-sm font-semibold cursor-pointer ${
                      statusFilter === status ? 'text-cyan-700 bg-cyan-50' : 'text-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Show/Hide UIDs */}
          <button
            onClick={() => setShowMasked(!showMasked)}
            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            {showMasked ? <EyeOff className="w-4 h-4 text-cyan-600" /> : <Eye className="w-4 h-4 text-cyan-600" />}
            {showMasked ? 'Show' : 'Mask'} UIDs
          </button>
        </div>
      </div>

      {/* RFID Tracking Table */}
      {activeTab === 'rfid' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">RFID UID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Last Zone</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Last Scan</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total Scans</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((rfid) => (
                <motion.tr
                  key={rfid.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/80 transition-all cursor-pointer"
                  onClick={() => setSelectedRFID(rfid)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-cyan-700 font-mono font-bold text-sm">
                        {showMasked ? rfid.maskedUid : rfid.uid}
                      </code>
                      {rfid.flagged && (
                        <AlertTriangle className="w-4 h-4 text-amber-500" title={rfid.flagReason} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(rfid.status)}`}>
                      {rfid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-bold">{rfid.assignedTo}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{rfid.lastZone}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-medium">{rfid.lastScan}</td>
                  <td className="px-6 py-4 text-slate-900 font-extrabold">{rfid.totalScans}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRFID(rfid);
                      }}
                      className="text-cyan-600 hover:text-cyan-800 font-bold text-sm transition-colors cursor-pointer"
                    >
                      View Details →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredList.length === 0 && (
            <div className="text-center py-12">
              <Radio className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No RFID records found</p>
            </div>
          )}
        </div>
      )}

      {/* Registered Users Table */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Pilgrim Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">RFID UID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Current Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Registered</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/80 transition-all cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                        {user.assignedTo.charAt(0)}
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold">{user.assignedTo}</div>
                        <div className="text-xs text-slate-500 font-medium">Age: {user.age}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-slate-800 font-medium flex items-center gap-2 mb-0.5">
                        <Phone className="w-3.5 h-3.5 text-cyan-600" />
                        {user.phoneNumber}
                      </div>
                      <div className="text-slate-500 flex items-center gap-2 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-cyan-700 font-mono font-bold text-sm">
                      {showMasked ? user.maskedUid : user.uid}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium text-sm">
                      <MapPin className="w-4 h-4 text-cyan-600" />
                      {user.lastZone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-medium">{user.registeredDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                      className="text-cyan-600 hover:text-cyan-800 font-bold text-sm transition-colors cursor-pointer"
                    >
                      View Profile →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredList.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No registered pilgrims found</p>
            </div>
          )}
        </div>
      )}

      {/* RFID Details Modal */}
      <AnimatePresence>
        {selectedRFID && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRFID(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Radio className="w-8 h-8 text-cyan-600" />
                    <h2 className="text-2xl font-bold text-slate-900">
                      {showMasked ? selectedRFID.maskedUid : selectedRFID.uid}
                    </h2>
                    {selectedRFID.flagged && (
                      <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Flagged
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm">Registered: {selectedRFID.registeredDate}</p>
                </div>
                <button
                  onClick={() => setSelectedRFID(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* RFID Info Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1">Status</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedRFID.status)}`}>
                    {selectedRFID.status}
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1">Assigned To</div>
                  <div className="text-slate-900 font-semibold">{selectedRFID.assignedTo}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1">Total Scans</div>
                  <div className="text-slate-900 font-bold text-xl">{selectedRFID.totalScans}</div>
                </div>
              </div>

              {selectedRFID.flagged && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Flagged Reason
                  </div>
                  <p className="text-amber-700 text-sm">{selectedRFID.flagReason}</p>
                </div>
              )}

              {/* Scan History */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-6">
                <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-600" />
                  Scan History & Movement Timeline
                </h3>
                <div className="space-y-3">
                  {selectedRFID.scanHistory?.map((scan, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        scan.flagged
                          ? 'bg-rose-50 border-rose-200 text-rose-800'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${scan.flagged ? 'text-rose-500' : 'text-cyan-600'}`} />
                        <div>
                          <div className="text-slate-900 font-semibold">{scan.zone}</div>
                          <div className="text-xs text-slate-500 capitalize">{scan.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-500 text-sm">{scan.timestamp}</span>
                        {scan.flagged && (
                          <AlertTriangle className="w-4 h-4 text-rose-500 ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Super Admin Actions */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  Super Admin Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedRFID.status !== 'blocked' ? (
                    <button
                      onClick={() => {
                        handleDisable(selectedRFID.id);
                        setSelectedRFID(null);
                      }}
                      className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Ban className="w-4 h-4" />
                      Disable RFID
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleEnable(selectedRFID.id);
                        setSelectedRFID(null);
                      }}
                      className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Enable RFID
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      handleReassign(selectedRFID.id);
                      setSelectedRFID(null);
                    }}
                    className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reassign RFID
                  </button>
                  
                  {!selectedRFID.flagged && (
                    <button
                      onClick={() => {
                        handleMarkSuspicious(selectedRFID.id);
                        setSelectedRFID(null);
                      }}
                      className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Flag Suspicious
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedRFID(null)}
                    className="px-4 py-2.5 bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 rounded-lg text-sm font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-400">
                  🔒 All Super Admin actions are logged and audited for security compliance
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900"
            >
              {/* User Profile Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {selectedUser.assignedTo?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedUser.assignedTo}</h2>
                    <p className="text-slate-500 text-sm">Age: {selectedUser.age} • {selectedUser.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                      {selectedUser.flagged && (
                        <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Flagged
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Information Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    Phone Number
                  </div>
                  <div className="text-slate-900 font-semibold">{selectedUser.phoneNumber}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    Email Address
                  </div>
                  <div className="text-slate-900 font-semibold text-sm truncate">{selectedUser.email}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-600" />
                    RFID UID
                  </div>
                  <code className="text-cyan-700 font-mono text-sm font-semibold">
                    {showMasked ? selectedUser.maskedUid : selectedUser.uid}
                  </code>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Registered Date
                  </div>
                  <div className="text-slate-900 font-semibold">{selectedUser.registeredDate}</div>
                </div>
              </div>

              {/* Current Location */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-6">
                <h3 className="text-slate-900 font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  Current Location
                </h3>
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                  <div>
                    <div className="text-slate-900 font-semibold">{selectedUser.lastZone}</div>
                    <div className="text-xs text-slate-500">Last scanned: {selectedUser.lastScan}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500 text-xs">Total Scans</div>
                    <div className="text-slate-900 font-bold text-xl">{selectedUser.totalScans}</div>
                  </div>
                </div>
              </div>

              {/* Movement History */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-6">
                <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-600" />
                  Movement History
                </h3>
                <div className="space-y-3">
                  {selectedUser.scanHistory?.map((scan, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        scan.flagged
                          ? 'bg-rose-50 border-rose-200 text-rose-800'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${scan.flagged ? 'text-rose-500' : 'text-cyan-600'}`} />
                        <div>
                          <div className="text-slate-900 font-semibold">{scan.zone}</div>
                          <div className="text-xs text-slate-500 capitalize">{scan.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-500 text-sm">{scan.timestamp}</span>
                        {scan.flagged && (
                          <AlertTriangle className="w-4 h-4 text-rose-500 ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Actions */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  User Management Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      handleReassign(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reassign RFID
                  </button>
                  
                  {selectedUser.status !== 'blocked' ? (
                    <button
                      onClick={() => {
                        handleDisable(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Ban className="w-4 h-4" />
                      Block User
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleEnable(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Unblock User
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2.5 bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 rounded-lg text-sm font-semibold transition-all col-span-2"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
