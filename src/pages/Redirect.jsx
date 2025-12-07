import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Redirect() {

    const navigate = useNavigate()
    const userInfo = localStorage.getItem("loggedUserInfo")

    useEffect(() => {
        if (!userInfo){
        navigate("/login")
    } else {
        navigate("/logs")
    }
    }, [])

  return (
    <>
    </>
  )
}

export default Redirect
