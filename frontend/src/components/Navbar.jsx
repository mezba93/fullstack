import React, { useState, useEffect, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink,useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const navRef = useRef([])
  const [showMenu,setShowMenu]  = useState(false)
  const { token, saveToken,userData } = useContext(AppContext)


  const logout = () => {
    saveToken("");
    navigate("/login");
     
      
    };
  

  const links = [
    { path: '/', label: 'HOME' },
    { path: '/Doctors', label: 'ALL DOCTORS' },
    { path: '/About', label: 'ABOUT' },
    { path: '/Contact', label: 'CONTACT' }
  ]

  useEffect(() => {
  let index = links.findIndex(link => {
    if (link.path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(link.path)
  })

  const current = navRef.current[index]

  if (current) {
    setIndicatorStyle({
      left: current.offsetLeft,
      width: current.offsetWidth
    })
  }
    }, [location])

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <div className="relative hidden md:flex gap-8 font-medium">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            ref={(el) => (navRef.current[index] = el)}
            className="py-1"
          >
            {link.label}
          </NavLink>
        ))}

        <span
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
          style={indicatorStyle}
        ></span>
      </div>
      <div>
        {token && userData ? (
          <div className="flex items-center gap-2 group relative cursor-pointer">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            {" "}
            Create account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden "
          src={assets.menu_icon}
          alt=""
        />
        {/* ....mobile menu.... */}
        <div
          className={`${showMenu ? "fixed w-full" : "h-0 w-0"} cssName='px-4 py-2 rounded full inline-block' md:hidden right-0 top-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6 ">
            <img className="w-36  " src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
              <p className="px-4 py-2 rounded inline-block"> ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar