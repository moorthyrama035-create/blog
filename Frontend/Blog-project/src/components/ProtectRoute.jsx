import React from 'react'
import {Navigate,Outlet} from "react-router-dom"
const ProtectRoute = () => {
    let token=localStorage.getItem("token")
  return token ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
}
export default ProtectRoute
