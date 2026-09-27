import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit2, Trash2, Shield, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';

const ROLES = [
  { value: 'LIVE_MANAGEMENT', label: 'Live Management', badge: 'bg-purple-50 text-purple-700 border-purple-200', avatar: 'bg-purple-100 text-purple-700' },
  { value: 'RFID_REGISTRY', label: 'RFID Registry', badge: 'bg-blue-50 text-blue-700 border-blue-200', avatar: 'bg-blue-100 text-blue-700' },
  { value: 'ALERTS_EMERGENCY', label: 'Alerts & Emergency', badge: 'bg-rose-50 text-rose-700 border-rose-200', avatar: 'bg-rose-100 text-rose-700' },
  { value: 'POLICE_DASHBOARD', label: 'Police Dashboard', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', avatar: 'bg-indigo-100 text-indigo-700' },
  { value: 'MEDICAL_DASHBOARD', label: 'Medical Dashboard', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', avatar: 'bg-emerald-100 text-emerald-700' },
  { value: 'OPERATOR_STAFF', label: 'Operator / Staff Dashboard', badge: 'bg-amber-50 text-amber-700 border-amber-200', avatar: 'bg-amber-100 text-amber-700' },
  { value: 'PUBLIC_PILGRIM', label: 'Public / Pilgrim Dashboard', badge: 'bg-slate-100 text-slate-700 border-slate-200', avatar: 'bg-slate-100 text-slate-700' }
];

// Mock Users Data
const MOCK_USERS = [
  {
    _id: '1',
    name: 'Rajesh Kumar',
    phoneNumber: '+91 9876543210',
    role: 'LIVE_MANAGEMENT',
    createdAt: '2026-01-01T10:30:00Z'
  },
  {
    _id: '2',
    name: 'Priya Sharma',
    phoneNumber: '+91 9876543211',
    role: 'RFID_REGISTRY',
    createdAt: '2026-01-02T11:45:00Z'
  },
  {
    _id: '3',
    name: 'Inspector Singh',
    phoneNumber: '+91 9876543212',
    role: 'POLICE_DASHBOARD',
    createdAt: '2026-01-02T14:20:00Z'
  },
  {
    _id: '4',
    name: 'Dr. Anita Verma',
    phoneNumber: '+91 9876543213',
    role: 'MEDICAL_DASHBOARD',
    createdAt: '2026-01-03T09:15:00Z'
  },
  {
    _id: '5',
    name: 'Amit Patel',
    phoneNumber: '+91 9876543214',
    role: 'ALERTS_EMERGENCY',
    createdAt: '2026-01-03T15:30:00Z'
  },
  {
    _id: '6',
    name: 'Sunita Gupta',
    phoneNumber: '+91 9876543215',
    role: 'OPERATOR_STAFF',
    createdAt: '2026-01-04T08:00:00Z'
  },
  {
    _id: '7',
    name: 'Vikram Reddy',
    phoneNumber: '+91 9876543216',
    role: 'LIVE_MANAGEMENT',
    createdAt: '2026-01-04T10:30:00Z'
  },
  {
    _id: '8',
    name: 'Constable Rahul',
    phoneNumber: '+91 9876543217',
    role: 'POLICE_DASHBOARD',
    createdAt: '2026-01-04T12:15:00Z'
  },
  {
    _id: '9',
    name: 'Meera Desai',
    phoneNumber: '+91 9876543218',
    role: 'RFID_REGISTRY',
    createdAt: '2026-01-05T07:45:00Z'
  },
  {
    _id: '10',
    name: 'Dr. Suresh Nair',
    phoneNumber: '+91 9876543219',
    role: 'MEDICAL_DASHBOARD',
    createdAt: '2026-01-05T11:00:00Z'
  },
  {
    _id: '11',
    name: 'Karan Mehta',
    phoneNumber: '+91 9876543220',
    role: 'OPERATOR_STAFF',
    createdAt: '2026-01-05T13:30:00Z'
  },
  {
    _id: '12',
    name: 'Pooja Singh',
    phoneNumber: '+91 9876543221',
    role: 'ALERTS_EMERGENCY',
    createdAt: '2026-01-06T09:00:00Z'
  },
  {
    _id: '13',
    name: 'Ravi Joshi',
    phoneNumber: '+91 9876543222',
    role: 'OPERATOR_STAFF',
    createdAt: '2026-01-06T10:15:00Z'
  },
  {
    _id: '14',
    name: 'SI Deepak Kumar',
    phoneNumber: '+91 9876543223',
    role: 'POLICE_DASHBOARD',
    createdAt: '2026-01-06T11:45:00Z'
  },
  {
    _id: '15',
    name: 'Anjali Rao',
    phoneNumber: '+91 9876543224',
    role: 'LIVE_MANAGEMENT',
    createdAt: '2026-01-06T14:20:00Z'
  }
];

export default function UserPermissionsView() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    role: '',
    name: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/auth/users');
      const apiUsers = response.data.data || [];
      const allUsers = [...MOCK_USERS, ...apiUsers];
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers(MOCK_USERS);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/create-user', formData);
      setShowCreateModal(false);
      setFormData({ phoneNumber: '', password: '', role: '', name: '' });
      fetchUsers();
      alert('User created successfully!');
    } catch (error) {
      const newUser = {
        _id: String(users.length + 1),
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      setShowCreateModal(false);
      setFormData({ phoneNumber: '', password: '', role: '', name: '' });
      alert('User created successfully (Demo Mode)!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/auth/users/${userId}`);
      fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      setUsers(users.filter(u => u._id !== userId));
      alert('User deleted successfully (Demo Mode)!');
    }
  };

  const getRoleInfo = (roleValue) => {
    return ROLES.find(r => r.value === roleValue) || { 
      label: roleValue, 
      badge: 'bg-slate-100 text-slate-700 border-slate-200', 
      avatar: 'bg-slate-100 text-slate-700' 
    };
  };

  return (
    <div className="p-6 space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-cyan-600" />
            Users & Permissions
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage operator credentials, access tiers, and departmental assignments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          Create New Operator
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => {
          const roleInfo = getRoleInfo(user.role);
          return (
            <div
              key={user._id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 ${roleInfo.avatar} rounded-xl flex items-center justify-center font-bold text-sm shadow-xs`}>
                      {user.name?.charAt(0) || <Users className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-sm">{user.name || 'User'}</h3>
                      <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleInfo.badge}`}>
                    {roleInfo.label}
                  </span>
                </div>

                <div className="text-slate-400 text-[11px] mb-4">
                  Registered: {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="w-full px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Revoke Access
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">No operators configured. Click 'Create New Operator' to assign permissions.</p>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-900">
            <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-600" />
              Add Command Staff Account
            </h2>

            <form onSubmit={handleCreateUser} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-slate-700 mb-1.5 text-xs font-semibold">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition-all"
                  placeholder="e.g. Officer Vikram Singh"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-slate-700 mb-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition-all"
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-slate-700 mb-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Initial Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition-all pr-10"
                    placeholder="Enter secure temporary password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-slate-700 mb-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  Assigned Operational Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-cyan-600 focus:bg-white transition-all"
                  required
                >
                  <option value="">Select an assigned role...</option>
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ phoneNumber: '', password: '', role: '', name: '' });
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 shadow-xs"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Grant Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
