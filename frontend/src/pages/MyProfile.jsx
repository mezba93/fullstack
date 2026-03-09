import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append('image', image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Profile Updated");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-3xl mx-auto px-6 py-10 text-gray-700">
        <div className="flex items-center gap-6">
          <img
            src={image ? URL.createObjectURL(image) : userData.image}
            alt=""
            className="w-28 h-28 rounded-lg object-cover"
          />

          {isEdit && (
            <label className="w-28 h-28 bg-indigo-100 rounded-lg flex items-center justify-center cursor-pointer">
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <span className="text-indigo-500 text-sm">Upload</span>
            </label>
          )}
        </div>

        {isEdit ? (
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="text-xl font-semibold mt-6 border-b outline-none"
          />
        ) : (
          <h2 className="text-xl font-semibold mt-6">{userData.name}</h2>
        )}

        <hr className="my-4 border-gray-300" />

        <p className="text-xs text-gray-500 font-semibold mb-3">
          CONTACT INFORMATION
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex">
            <p className="w-32 text-gray-500">Email:</p>
            {isEdit ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="border-b outline-none flex-1"
              />
            ) : (
              <p className="text-blue-600">{userData.email}</p>
            )}
          </div>

          <div className="flex">
            <p className="w-32 text-gray-500">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="border-b outline-none flex-1"
              />
            ) : (
              <p className="text-blue-600">{userData.phone}</p>
            )}
          </div>

          <div className="flex">
            <p className="w-32 text-gray-500">Address:</p>
            {isEdit ? (
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="border-b outline-none flex-1"
              />
            ) : (
              <p>
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 font-semibold mt-8 mb-3">
          BASIC INFORMATION
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex">
            <p className="w-32 text-gray-500">Gender:</p>
            {isEdit ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="border-b outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div className="flex">
            <p className="w-32 text-gray-500">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                name="dob"
                value={userData.dob ? userData.dob.slice(0, 10) : ""}
                onChange={handleChange}
                className="border-b outline-none"
              />
            ) : (
              <p>{userData.dob ? new Date(userData.dob).toDateString() : ""}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="px-6 py-2 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-50 transition"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
