import { NavLink, Link } from "react-router-dom"
import addBtn from "../assets/add-btn.png"
import settingsBtn from "../assets/settings icon.png"
import { useState, useEffect, useRef } from "react"

function Sidebar() {
  const [showSettings, setShowSettings] = useState(false)
  const settingsRef = useRef(null)

  const handleShowSettings = () => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false)
      }
    }

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSettings])

  return (
    <div className="sidebar-shadow pb-10 flex flex-col justify-between text-white fixed top-[20px] left-0 h-full w-[120px] bg-[#403F3F] pt-[40px] text-[24px] z-40">
      <ul style={{ listStyle: "none", fontSize: "16px" }} className="flex flex-col items-start justify-end px-3 poppins-regular">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link border-b border-[#868686] w-full"
                : "nav-link border-b border-[#868686] w-full"
            }
            to={"/logs"}>
            Logs
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link border-b border-[#868686] w-full"
                : "nav-link border-b border-[#868686] w-full"
            }
            to={"/dashboard"}>Dashboard</NavLink>
        </li>
      </ul>
      <div className="flex flex-col items-center" ref={settingsRef}>
        {showSettings && (
          <div className="fixed bottom-14 left-8 bg-zinc-800 h-40 w-40 mb-3 p-3 rounded-lg flex flex-col">
            <Link to={"/root-causes"} onClick={handleShowSettings} className="text-[12px]"> Root Causes</Link>
            <Link to={"/root-causes/create"} onClick={handleShowSettings} className="text-[12px]">  New Root Cause </Link>
          </div>
        )}
        <div className="flex w-full justify-between align-center px-3">
          <button onClick={handleShowSettings}>
            <img src={settingsBtn} alt="" />
          </button>
          <Link to={"/logs/create"}>
            <img src={addBtn} alt="create a new exception" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar