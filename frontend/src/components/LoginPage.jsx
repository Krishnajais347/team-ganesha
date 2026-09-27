import React, { useState } from 'react';
import { Shield, Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage({ onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Super Admin Credentials
    const SUPER_ADMIN_PHONE = '2222222222';
    const SUPER_ADMIN_PASSWORD = 'Krishna@123';

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (phoneNumber === SUPER_ADMIN_PHONE && password === SUPER_ADMIN_PASSWORD) {
        // Store authentication
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'SUPER_ADMIN');
        localStorage.setItem('userName', 'Super Admin');
        localStorage.setItem('userPhone', phoneNumber);
        
        onLogin({
          role: 'SUPER_ADMIN',
          name: 'Super Admin',
          phone: phoneNumber
        });
      } else {
        setError('Invalid phone number or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50/70 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Soft Ambient Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-8 shadow-2xl shadow-slate-300/50">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-600/25"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Kumbh Sava</h1>
            <p className="text-slate-500 font-medium text-sm">Super Admin Command Center</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <p className="text-sm font-semibold">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
            <div>
              <label className="block text-slate-700 mb-2 text-sm font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-600" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-50 transition-all font-medium"
                placeholder="Enter your phone number"
                required
                maxLength="10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 mb-2 text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-50 transition-all font-medium"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg shadow-cyan-600/25 disabled:opacity-50 disabled:cursor-not-allowed text-base cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Login to Command Center'
              )}
            </motion.button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-medium">
              Authorized personnel only • Kumbh Mela 2026 Telemetry Portal
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200/80 rounded-2xl shadow-xs">
          <p className="text-amber-800 text-xs font-bold mb-1 uppercase tracking-wider">Demo Credentials:</p>
          <div className="flex items-center justify-between text-xs text-amber-900 font-mono">
            <span>Phone: <strong>2222222222</strong></span>
            <span>Pass: <strong>Krishna@123</strong></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
