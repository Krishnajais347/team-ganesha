import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'User already exists' 
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'viewer'
    })

    await user.save()

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'default-secret-change-this',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, phone } = req.body

    // HEATMAP DEMO MODE: Accept any phone with Team@123
    if (phone && password === 'Team@123') {
      const token = jwt.sign(
        { userId: 'demo-' + Date.now(), role: 'admin' },
        process.env.JWT_SECRET || 'default-secret-change-this',
        { expiresIn: '24h' }
      )

      return res.json({
        success: true,
        user: {
          id: 'demo-' + Date.now(),
          name: 'Admin User',
          phone: phone,
          email: phone + '@kumbh.com',
          role: 'admin',
          avatar: `https://ui-avatars.com/api/?name=Admin&background=667eea&color=fff`
        },
        token
      })
    }

    // Regular email login
    if (!email) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      })
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      })
    }

    // Update last login
    user.lastLogin = new Date()
    user.status = 'online'
    await user.save()

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'default-secret-change-this',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token
      }
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    // This would normally use auth middleware to verify JWT
    // For now, it's a placeholder
    
    res.json({
      success: true,
      data: {
        message: 'Add auth middleware to verify JWT token'
      }
    })
  } catch (error) {
    res.status(401).json({ success: false, error: error.message })
  }
})

// Create new user (for admin use)
router.post('/create-user', async (req, res) => {
  try {
    const { name, phoneNumber, password, role } = req.body

    // Check if user with phone number exists
    const existingUser = await User.findOne({ phoneNumber })
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this phone number already exists' 
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      name,
      phoneNumber,
      password: hashedPassword,
      role: role || 'PUBLIC_PILGRIM',
      email: `${phoneNumber}@temp.com` // Temporary email
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

export default router
