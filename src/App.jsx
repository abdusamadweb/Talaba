import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router";
import Header from "./components/header/Header.jsx";
import './assets/styles/global.css'
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/nav-bar/NavBar.jsx";
import Search from "./pages/search/Search.jsx";
import Applications from "./pages/applications/Applications.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UniversityId from "./pages/university-id/UniversityId.jsx";

function App() {

  return (
    <div className='App'>
        <BrowserRouter>

            <Header />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/applications' element={<Applications />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/university/:id' element={<UniversityId />} />

                <Route path='/university' element={<UniversityId />} />

            </Routes>
            <NavBar />

        </BrowserRouter>
    </div>
  )
}

export default App
