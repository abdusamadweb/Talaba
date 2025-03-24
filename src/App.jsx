import './App.scss'
import {BrowserRouter, Route, Routes, useLocation} from "react-router"
import Header from "./components/header/Header.jsx"
import './assets/styles/global.css'
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
import AuthRedirect from "./components/AuthRedirect.jsx"
import MyProfileEdit from "./pages/profile/MyProfileEdit.jsx";


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
        <BrowserRouter>
            <Wrapper>

                {loading && <Loader setLoading={setLoading} />}

                <Header />

                <Routes>
                    <AuthRedirect />

                    <Route element={<Auth />}>

                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/applications' element={<Applications />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/me' element={<MyProfile />} />
                        <Route path='/profile/me/edit' element={<MyProfileEdit />} />
                        <Route path='/university/:id' element={<UniversityId />} />

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
        </BrowserRouter>
    </div>
  )
}

export default App
