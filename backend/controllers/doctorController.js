import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body

        const docData = await doctorModel.findById(docId)

        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" })
        }

        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        })

        res.json({ success: true, message: "Availability updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req,res) =>
{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({ success: true, doctors })
        
        
    } catch (error) {
       console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

//api for doctor login
const loginDoctor = async (req,res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        
        if (!doctor)
        {
            return res.json({ success: false, message: "Invalid credentials" })
            
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        
        if (isMatch)
        {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
            
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
            
        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

//api to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.doctor._id
        const appointments = await appointmentModel.find({ docId })
        
        res.json({ success: true, appointments })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

//api to mark appointment completed
const appointmentComplete = async (req, res) => {
  try {
     const { appointmentId } = req.body
    const docId = req.doctor._id

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString()=== docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//api to cancel appointment for doctor panel 
const appointmentCancel = async (req, res) => {
  try {

    const { appointmentId } = req.body
    const docId = req.doctor._id

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId.toString() === docId.toString()) {

      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
        isCompleted: false
      })

      res.json({ success: true, message: "Appointment Cancelled" })

    } else {
      res.json({ success: false, message: "Unauthorized action" })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api  to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {
        const docId = req.doctor._id
        const appointments = await appointmentModel.find({ docId })
        
        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item )=> {
            if (!patients.includes(item.userId))
            {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            totalAppointments: appointments.length,
            totalPatients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData }) // send dashData
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {

    const doctorId = req.doctor._id

    const doctorData = await doctorModel.findById(doctorId).select('-password')

    res.json({ success: true, doctorData })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

//api to update doctor profile data for doctor panel

const updateDoctorProfile = async (req, res) => {

  try {

    const { fees, address, available } = req.body
    const docId = req.doctor._id

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true }
    ).select('-password')

    res.json({
      success: true,
      message: "Profile updated",
      doctorData: updatedDoctor
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}
export {
    changeAvailability,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}
