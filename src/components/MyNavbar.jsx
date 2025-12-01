import LightLogo from "../assets/tiap-nav-logo-light.png"
import { Link } from "react-router-dom"

function MyNavbar() {
  return (

    <div
      className="bottom-shadow flex flex-row items-center justify-between pl-3 h-[34px] w-full bg-[#403f3f] fixed top-0 left-0 ">
      <img style={{height: "24px"}} src={LightLogo} alt="" />

      <ul style={
        {
          listStyle: "none",
          marginBottom: 0,
          color: "#fff"
        }
      }
      className="flex items-center gap-3 pr-2 poppins-light">
        <li><Link to={"/"}>Login</Link></li>
      </ul>

    </div>
  )
}

export default MyNavbar
