import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Load token from localStorage on initial load
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // Helper: set token in state + localStorage
  const saveToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      setToken("");
    }
  };

  // Fetch doctors
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch user profile
  const loadUserProfileData = async () => {
    if (!token) {
      setUserData(null);
      return;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message);
      }
    } catch (error) {
      setUserData(null);
      if (error.response?.status === 401) {
        // token invalid or expired → log out
        saveToken("");
      }
      console.error(error);
    }
  };

  // Run once on app start
  useEffect(() => {
    getDoctorsData();
   
  }, []);
    
    
    useEffect(() => {
        if (token) {
         loadUserProfileData();   
        }
        else {
            setUserData(false)
      }   
    },[token])

  const value = {
    currencySymbol,
    backendUrl,
    doctors,
    getDoctorsData,
    token,setToken,
    saveToken, // use this to update token after login/logout
    userData,
    setUserData,
    loadUserProfileData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
