import './AdminHeader.scss'
import React, {useState} from 'react';
import {Link, useHref} from "react-router-dom";
import AdminNavBar from "./AdminNavBar.jsx";
import {hiddenRoutesAdmin, openRoutesAdmin} from "../../../assets/scripts/mockAPI.js";

const AdminHeader = () => {

    const href = useHref({})
    const isHidden = hiddenRoutesAdmin.some(route => href.includes(route))
    const isOpen = openRoutesAdmin.some(route => href.includes(route))

    const [openMenu, setOpenMenu] = useState(false)


    return (
        <div className={
            `admin-header ${openMenu ? 'open' : ''} ${isHidden ? 'd-none' : ''} ${isOpen ? 'd-block' : ''}`
        }>
            <div className="container">
                <div className="admin-header__inner">
                    <Link className='admin-header__logos' to='/admin/university'>
                        <h1 className={`admin-header__logo ${openMenu && 'opa'}`}>CRM</h1>
                    </Link>
                    <AdminNavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
                    <div className='burger-menu'>
                        <button onClick={() => setOpenMenu(true)}>
                            <i className={`fa-solid fa-bars-staggered icon ${openMenu ? 'close' : 'open'}`}/>
                        </button>
                        <button onClick={() => setOpenMenu(false)}>
                            <i className={`fa-solid fa-xmark icon ${openMenu ? 'open left' : 'close'}`}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;