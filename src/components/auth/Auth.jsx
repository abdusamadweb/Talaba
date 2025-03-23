import React from 'react'
import {Navigate, Outlet} from "react-router-dom"

const Auth = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    const token = localStorage.getItem('token')
    const state = localStorage.getItem('user-state')

    return (
        state ? (
            <Outlet />
        ) : token ? (
            <Navigate to={`/login/auth?phone=${user?.phone_number}`} />
        ) : (
            <Navigate to="/login" />
        )
    )
}

export default Auth