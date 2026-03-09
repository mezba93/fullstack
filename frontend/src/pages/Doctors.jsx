import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [showFiler, setShowFilter] = useState(false)
   

  useEffect(() => {

  if (speciality) {

    const formattedSpeciality =
      speciality.replace(/_/g, " ")

    setFilterDoc(
      doctors.filter(
        doc => doc.speciality === formattedSpeciality
      )
    )

  } else {
    setFilterDoc(doctors)
  }

}, [doctors, speciality])

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <p className="text-gray-600 mb-6">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-8 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFiler ? "bg-primary text-white " : ""}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filter
        </button>

        {/* Sidebar */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${showFiler ? "flex" : "hidden sm:flex"} `}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((item, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
              className={`
              w-full px-4 py-2 border rounded cursor-pointer transition-all duration-300
              ${
                speciality === item
                  ? "bg-indigo-100 text-black border-indigo-400"
                  : "hover:bg-gray-100"
              }
            `}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full h-60 object-cover"
                src={item.image}
                alt=""
              />

              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"} `}
                >
                  <p
                    className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"}  rounded-full `}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>

                <p className="text-gray-900 text-lg font-medium mt-2">
                  {item.name}
                </p>

                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors