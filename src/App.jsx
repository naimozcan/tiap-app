import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Loading from "./pages/Loading"
import InternalServerError from "./pages/errors/InternalServerError"
import Unauthorized from "./pages/errors/Unauthorized"
import MyNavbar from "./components/MyNavbar"
import Sidebar from "./components/Sidebar"
import MyFooter from "./components/MyFooter"
import { Route, Routes } from "react-router-dom"
import CreateExceptionLog from "./pages/CreateExceptionLog"
import ExceptionDetails from "./pages/ExceptionDetails"
import ExceptionLogs from "./pages/ExceptionLogs"
import RootCauses from "./pages/RootCauses"
import RootCauseDetails from "./pages/RootCauseDetails"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NotFound from "./pages/errors/NotFound"
import { AuthContext } from "./contexts/auth.context"

function App() {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="w-full min-h-screen" style={{ background: "linear-gradient(0deg,rgba(0, 0, 0, 0.43) 25%, rgba(0, 0, 0, 0) 100%)" }}>

      <MyNavbar />

      {isLoggedIn && <Sidebar />}

      <div id="main-content" className="h-auto pb-20">
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/logs"} element={<ExceptionLogs />} />
          <Route path={"/505"} element={<InternalServerError />} />
          <Route path={"/404"} element={<NotFound />} />
          <Route path={"/unauthorized"} element={<Unauthorized />} />
          <Route path={"/"} element={<InternalServerError />} />
          <Route path={"/unauthorized"} element={<InternalServerError />} />
          <Route path={"/unauthorized"} element={<InternalServerError />} />
        </Routes>
      </div>

      <MyFooter />

    </div>
  )
}

export default App