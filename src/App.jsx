// global styles
import './assets/styles/global.css'
import './App.scss'

import {Route, Routes, useLocation} from "react-router-dom"
import Header from "./components/header/Header.jsx"
import Home from "./pages/home/Home.jsx"
import NavBar from "./components/nav-bar/NavBar.jsx"
import Search from "./pages/search/Search.jsx"
import Applications from "./pages/applications/Applications.jsx"
import Profile from "./pages/profile/Profile.jsx"
import UniversityId from "./pages/university-id/UniversityId.jsx"
import MyProfile from "./pages/profile/MyProfile.jsx"
import {Toaster} from "react-hot-toast"
import {useEffect, useLayoutEffect, useState} from "react"
import Login from "./pages/login/Login.jsx"
import Login2 from "./pages/login/Login2.jsx"
import Auth from "./components/auth/Auth.jsx"
import Loader from "./components/loader/Loader.jsx"
import MyProfileEdit from "./pages/profile/MyProfileEdit.jsx";
import News from "./pages/news/News.jsx";
import AuthAdmin from "./components/auth/AuthAdmin.jsx";
import AdminHome from "./pages/admin/home/AdminHome.jsx";
import AdminLogin from "./pages/admin/login/AdminLogin.jsx";
import SearchQ from "./pages/search/SearchQ.jsx";
import {$resp} from "./api/apiResp.js";
import {useQuery} from "@tanstack/react-query";
import {antdConfig} from "./config/antd/antdConfig.js";
import {ConfigProvider} from "antd";
import AdminAds from "./pages/admin/ads/AdminAds.jsx";
import AdminEduLang from "./pages/admin/edu-lang/AdminEduLang.jsx";
import AdminRegions from "./pages/admin/regions/AdminRegions.jsx";
import AdminMainDir from "./pages/admin/main-direction/AdminMainDir.jsx";
import AdminNews from "./pages/admin/news/AdminNews.jsx";
import AdminHeader from "./components/admin/header/AdminHeader.jsx";


// default fetches
const fetchMe = async () => {
    const { data } = await $resp.get('/get-me')
    return data
}
const fetchApps = async () => {
    const { data } = await $resp.get('/application/my')
    return data
}
const fetchDirections = async () => {
    const { data } = await $resp.get('/main-direction/all')
    return data
}


const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [location.pathname])
    return children
}

function App() {

    const [loading, setLoading] = useState(true)
    const path = window.location.pathname


    // Fetch me
    const { data } = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })
    const { data: _ } = useQuery({
        queryKey: ['directions'],
        queryFn: fetchDirections,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })
    const { data: __ } = useQuery({
        queryKey: ['applications'],
        queryFn: fetchApps,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) localStorage.setItem("user", JSON.stringify(data))
    }, [data])


    return (
    <div className={`App ${path.includes('login') ? 'pb0' : ''} ${path.includes('admin') ? 'admin' : ''}`}>

        {loading && <Loader setLoading={setLoading} />}

        {path.includes('admin') ? (
            <ConfigProvider theme={antdConfig()}>
                <AdminHeader />

                <Routes>
                    <Route element={<AuthAdmin />}>
                        <Route path='/admin/' element={<AdminHome />} />
                        <Route path='/admin/ads' element={<AdminAds />} />
                        <Route path='/admin/edu-lang' element={<AdminEduLang />} />
                        <Route path='/admin/regions' element={<AdminRegions />} />
                        <Route path='/admin/main-direction' element={<AdminMainDir />} />
                        <Route path='/admin/news' element={<AdminNews />} />
                    </Route>

                    <Route path='/admin/login' element={<AdminLogin />} />
                </Routes>
            </ConfigProvider>
        ) : (
            <Wrapper>
                <Header />

                <Routes>
                    <Route element={<Auth />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/searchQ' element={<SearchQ />} />
                        <Route path='/applications' element={<Applications />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/me' element={<MyProfile />} />
                        <Route path='/profile/me/edit' element={<MyProfileEdit />} />
                        <Route path='/university/:id' element={<UniversityId />} />
                        <Route path='/news/:id' element={<News />} />
                    </Route>

                    <Route path='/login' element={<Login />} />
                    <Route path='/login/auth' element={<Login2 />} />
                </Routes>

                <NavBar />
            </Wrapper>
        )}


        <Toaster
            position="top-center"
            reverseOrder={true}
            toastOptions={{
                style: {
                    borderRadius: '30px'
                }}}
        />
    </div>
  )
}

export default App
