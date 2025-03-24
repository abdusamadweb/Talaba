import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const Auth = () => {

    const state = localStorage.getItem("user-state")

    if (state === "system-active") {
        return <Outlet />
    }

    return <Navigate to="/login" />
};

export default Auth
