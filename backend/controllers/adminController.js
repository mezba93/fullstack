import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import validator from "validator"
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


const addDoctor = async (req, res) => {
    console.log("BODY:", req.body)
console.log("FILE:", req.file)
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added Successfully"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api for admin login

const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ success: true, token })
    }
    res.json({ success: false, message: 'Invalid credentials' })
}

// api to get all doctor list 
const allDoctor = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
        
    }
    catch (error)
    {
        console.log(error)
        res.json({ success: false, message: error.message })
        
        
        }
    
}

//api to get all appointment list
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for appointment  cancellation
const appointmentCancel = async (req, res) => {

  try {

    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

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

//api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        
        const dashData = {
            doctor: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
            
        }
        res.json({ success: true, dashData })
        
        
    } catch (error) {

        console.log(error)
    res.json({ success: false, message: error.message })
    }
}



export { addDoctor, loginAdmin, allDoctor,appointmentsAdmin,appointmentCancel,adminDashboard }
