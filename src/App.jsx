import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router";
import Header from "./components/header/Header.jsx";
import './assets/styles/global.css'
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/nav-bar/NavBar.jsx";
import Search from "./pages/search/Search.jsx";
import Applications from "./pages/applications/Applications.jsx";

function App() {

  return (
    <div className='App'>
        <BrowserRouter>

            <Header />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/applications' element={<Applications />} />

            </Routes>
            <NavBar />

        </BrowserRouter>
    </div>
  )
}

export default App
