import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch Doctor Info
  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc || null);
  };

  // Generate Available Slots
  const getAvailableSlots = () => {
    if (!docInfo) return;

    let slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;

        const isBooked =
          docInfo?.slot_booked?.[slotDate]?.includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  // Book Appointment
  const bookAppointment = async () => {
  if (!token) {
    toast.warn("Login to book appointment");
    return navigate("/login");
  }

  if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
    toast.error("No slots available");
    return;
  }

  if (!slotTime) {
    toast.error("Please select a time");
    return;
  }

  // ✅ find the exact selected slot
  const selectedSlot = docSlots[slotIndex].find(
    (slot) => slot.time === slotTime
  );

  if (!selectedSlot) {
    toast.error("Invalid slot selected");
    return;
  }
try {
  const date = selectedSlot.datetime;

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const slotDate = day + "-" + month + "-" + year;

  const { data } = await axios.post(
    backendUrl + "/api/user/book-appointment",
    { docId:docInfo._id, slotDate, slotTime },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (data.success) {
    toast.success(data.message);

    setDocInfo((prev) => {
      const updated = { ...prev };

      if (!updated.slot_booked) updated.slot_booked = {};
      if (!updated.slot_booked[slotDate]) updated.slot_booked[slotDate] = [];

      updated.slot_booked[slotDate].push(slotTime);

      return updated;
    });

    setSlotTime("");
    navigate("/my-appointments");
  }

} catch (error) {
  console.log("BOOK ERROR:", error.response?.data || error.message);
  toast.error(error.response?.data?.message || "Booking failed");
}
};
  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);
  

  return (
    docInfo && (
      <div className="max-w-6xl mx-auto px-4 mt-10">
        {/* Doctor Details */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              className="w-full rounded-xl bg-blue-50 object-cover"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-3 mt-2 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="px-3 py-1 text-sm border rounded-full bg-blue-50 text-blue-600">
                {docInfo.experience}
              </button>
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-2 font-medium text-gray-800">
                About
                <img className="w-5" src={assets.info_icon} alt="" />
              </p>

              <p className="mt-1 text-sm text-gray-600 max-w-[700px]">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-5">
              Appointment fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          <div className="flex gap-3 overflow-x-scroll mt-4">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-scroll mt-4">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-600 border border-gray-200"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm px-14 py-3 rounded-full my-6"
          >
            Book an Appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
