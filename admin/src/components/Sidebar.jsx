import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
const {dToken}=useContext(DoctorContext)
  

  return (
    <div className="w-64 min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-gray-600 mt-5">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img src={assets.home_icon} alt="dashboard" className="w-5 h-5" />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>
          </li>

          {/* Appointments */}
          <li>
            <NavLink
              to="/all-appointment"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="appointments"
                className="w-5 h-5"
              />
              <p className="hidden md:block">Appointments</p>
            </NavLink>
          </li>

          {/* Add Doctor */}
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img src={assets.add_icon} alt="add doctor" className="w-5 h-5" />
              <p className="hidden md:block">Add Doctor</p>
            </NavLink>
          </li>

          {/* Doctors List */}
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img
                src={assets.people_icon}
                alt="doctor list"
                className="w-5 h-5"
              />
              <p className="hidden md:block">Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
      {dToken && (
        <ul className="text-gray-600 mt-5">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img src={assets.home_icon} alt="dashboard" className="w-5 h-5" />
              <p className="hidden md:block"> Doctor Dashboard</p>
            </NavLink>
          </li>

          {/* Appointments */}
          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Doctor appointments"
                className="w-5 h-5"
              />
              <p className="hidden md:block">Appointments</p>
            </NavLink>
          </li>

          {/* Doctors List */}
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 transition-all duration-200 ${
                  isActive
                    ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img
                src={assets.people_icon}
                alt="doctor profile"
                className="w-5 h-5"
              />
              <p className="hidden md:block">Doctors profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;