import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'


//doctor authentication middlewares
const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, login again' })
    }

    const dtoken = authHeader.split(' ')[1]

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET)

    const doctor = await doctorModel.findById(decoded.id).select('-password')

    if (!doctor) {
      return res.status(401).json({ message: 'User not found, login again' })
    }

    req.doctor = doctor   // ✅ attach full user

    next()

  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token invalid or expired, login again' })
  }
}

export default authDoctor