import './App.scss'
import {BrowserRouter, Route, Routes, useLocation} from "react-router";
import Header from "./components/header/Header.jsx";
import './assets/styles/global.css'
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/nav-bar/NavBar.jsx";
import Search from "./pages/search/Search.jsx";
import Applications from "./pages/applications/Applications.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UniversityId from "./pages/university-id/UniversityId.jsx";
import MyProfile from "./pages/profile/MyProfile.jsx";
import {Toaster} from "react-hot-toast";
import {useLayoutEffect} from "react";
import Login from "./pages/login/Login.jsx";


const Wrapper = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [location.pathname])
    return children
}

function App() {

  return (
    <div className={`App ${window.location.pathname.includes('login') ? 'pb0' : ''}`}>
        <BrowserRouter>
            <Wrapper>

                <Header />
                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/applications' element={<Applications />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/me' element={<MyProfile />} />
                    <Route path='/university/:id' element={<UniversityId />} />

                    <Route path='/login' element={<Login />} />

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
