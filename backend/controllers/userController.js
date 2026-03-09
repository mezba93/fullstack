import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.json({ success: false, message: "Missing Details" })

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Enter a valid Email" })

    if (password.length < 8)
      return res.json({ success: false, message: "Enter a strong password" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    })

    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// Login
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user)
      return res.json({ success: false, message: "User does not exist" })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      return res.json({ success: false, message: "Invalid Credentials" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}


// Get Profile
const getProfile = async (req, res) => {

  try {

    const userData = req.user

    res.json({ success: true, userData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}


// Update Profile
const updateProfile = async (req, res) => {

  try {

    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender)
      return res.json({ success: false, message: "Data Missing" })

    await userModel.findByIdAndUpdate(req.user._id, {
      name,
      phone,
      address: address ? JSON.parse(address) : undefined,
      dob,
      gender
    })

    if (imageFile) {

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      })

      await userModel.findByIdAndUpdate(req.user._id, {
        image: imageUpload.secure_url
      })

    }

    res.json({ success: true, message: "Profile Updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}


// Book Appointment (Manual Payment)
const bookAppointment = async (req, res) => {

  try {

    const { docId, slotDate, slotTime } = req.body
    const userId = req.user._id

    if (!docId || !slotDate || !slotTime)
      return res.json({ success: false, message: "Missing required fields" })

    const doctorData = await doctorModel.findById(docId).select('-password')

    if (doctorData.available===false)
      return res.json({ success: false, message: "Doctor not available" })

    let slots_booked = doctorData.slots_booked

    if (slots_booked[slotDate]) {

      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" })
      } else {
        slots_booked[slotDate].push(slotTime)
      }

    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const appointmentData = {

      userId,
      docId,
      userData: req.user,
      docData: doctorData,
      amount: doctorData.fees,
      slotTime,
      slotDate,
      date: Date.now(),

      paymentMethod: "Manual",
      paymentStatus: "Pending"

    }

    const newAppointment = new appointmentModel(appointmentData)

    await newAppointment.save()

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: "Appointment Booked (Pay at Clinic)" })

  } catch (error) {

    console.log(error)
    res.json({ success: false, message: error.message })

  }

}


// List Appointments
const listAppointment = async (req, res) => {

  try {

    const userId = req.user._id

    const appointments = await appointmentModel.find({ userId })

    res.json({ success: true, appointments })

  } catch (error) {

    console.log(error)
    res.json({ success: false, message: error.message })

  }

}


// Cancel Appointment
const cancelAppointment = async (req, res) => {

  try {

    const { appointmentId } = req.body
    const userId = req.user._id

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData.userId.toString() !== userId.toString())
      return res.json({ success: false, message: "Unauthorized action" })

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true
    })

    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      e => e !== slotTime
    )

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: "Appointment Cancelled" })

  } catch (error) {

    console.log(error)
    res.json({ success: false, message: error.message })

  }

}


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment
}