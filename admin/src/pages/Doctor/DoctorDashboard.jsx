import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Doctor Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Total Earnings</p>
          <p className="text-2xl font-bold text-green-600">
            ${dashData.earnings}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Total Appointments</p>
          <p className="text-2xl font-bold text-blue-600">
            {dashData.totalAppointments}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">Total Patients</p>
          <p className="text-2xl font-bold text-purple-600">
            {dashData.totalPatients}
          </p>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Latest Appointments
        </h2>
        {dashData.latestAppointments.length === 0 ? (
          <p className="text-gray-500">No recent appointments.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Patient</th>
                  <th className="px-4 py-2 text-left text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-gray-600">Time</th>
                  <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                  <th className="px-4 py-2 text-left text-gray-600">Status</th>
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((appt) => (
                  <tr key={appt._id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{appt.userName || "N/A"}</td>
                    <td className="px-4 py-2">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{appt.time}</td>
                    <td className="px-4 py-2">${appt.amount}</td>
                    <td className="px-4 py-2">
                      {appt.isCompleted ? (
                        <span className="text-green-600 font-semibold">
                          Completed
                        </span>
                      ) : appt.isCancelled ? (
                        <span className="text-red-600 font-semibold">
                          Cancelled
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {!appt.isCompleted && !appt.isCancelled && (
                        <>
                          <button
                            onClick={() => completeAppointment(appt._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => cancelAppointment(appt._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
