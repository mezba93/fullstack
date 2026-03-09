import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, login again' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'User not found, login again' })
    }

    req.user = user   // ✅ attach full user

    next()

  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token invalid or expired, login again' })
  }
}

export default authUser