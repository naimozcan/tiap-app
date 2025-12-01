import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <div
            className="hidden sidebar-shadow flex flex-col justify-between text-white fixed top-[34px] left-0 h-full w-[160px] bg-[#403F3F] pt-[40px] text-[24px]">

            <ul
                style={{
                    listStyle: "none", fontSize: "16px"
                }}
                className="flex flex-col items-start justify-end px-3 poppins-regular">
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? "nav-link active-link border-b border-[#868686] w-full" : "nav-link border-b border-[#868686] w-full"} to={"/logs"}>
                        Logs
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link border-b border-[#868686] w-full" : "nav-link border-b border-[#868686] w-full"} to={"/dashboard"}>Dashboard</NavLink>
                </li>
            </ul>

        </div>
    )
}

export default Sidebar