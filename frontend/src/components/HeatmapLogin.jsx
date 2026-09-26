import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, LogIn, Map } from 'lucide-react';

const HeatmapLogin = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Demo mode - accept any phone with Team@123
      if (password === 'Team@123') {
        const user = {
          id: Date.now(),
          name: 'Admin User',
          phone: phone,
          role: 'admin',
          avatar: `https://ui-avatars.com/api/?name=Admin&background=667eea&color=fff`
        };
        
        // Store in localStorage
        localStorage.setItem('heatmapUser', JSON.stringify(user));
        localStorage.setItem('heatmapToken', 'demo-token-' + Date.now());
        
        onLogin(user);
      } else {
        setError('Invalid credentials. Use password: Team@123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="login-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="login-bg-circle"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="login-header">
          <motion.div
            className="login-icon"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Map size={48} />
          </motion.div>
          <h1 className="login-title">Live Crowd Heatmap</h1>
          <p className="login-subtitle">Real-time crowd monitoring dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Phone Input */}
          <div className="login-input-group">
            <Phone className="login-input-icon" size={20} />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="login-input-group">
            <Lock className="login-input-icon" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="login-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="login-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.div
                className="login-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <>
                <LogIn size={20} />
                <span>Login to Dashboard</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <div className="login-demo">
          <p className="login-demo-title">Demo Credentials:</p>
          <div className="login-demo-credentials">
            <div>
              <span className="login-demo-label">Phone:</span>
              <span className="login-demo-value">Any valid number</span>
            </div>
            <div>
              <span className="login-demo-label">Password:</span>
              <span className="login-demo-value">Team@123</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeatmapLogin;
