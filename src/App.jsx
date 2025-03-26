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
import {useLayoutEffect, useState} from "react"
import Login from "./pages/login/Login.jsx"
import Login2 from "./pages/login/Login2.jsx"
import Auth from "./components/auth/Auth.jsx"
import Loader from "./components/loader/Loader.jsx"
import MyProfileEdit from "./pages/profile/MyProfileEdit.jsx";
import AuthRedirect from "./components/auth/AuthRedirect.jsx";
import News from "./pages/news/News.jsx";


const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [location.pathname])
    return children
}

function App() {

    const [loading, setLoading] = useState(true)

  return (
    <div className={`App ${window.location.pathname.includes('login') ? 'pb0' : ''}`}>
        <Wrapper>

            {loading && <Loader setLoading={setLoading} />}

            <Header />

            {/*<AuthRedirect />*/}
            <Routes>

                <Route element={<Auth />}>

                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
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

            <Toaster
                position="top-center"
                reverseOrder={true}
                toastOptions={{
                    style: {
                        borderRadius: '30px'
                    }}}
            />
        </Wrapper>
    </div>
  )
}

export default App
