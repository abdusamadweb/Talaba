import React from 'react';
import {NavLink} from "react-router-dom";

const AdminNavBar = ({ openMenu, setOpenMenu }) => {

    const nav = [
        {
            name: 'Statistika',
            link: '/admin/dashboard'
        },
        {
            name: 'Universitetlar',
            link: '/admin/university'
        },
        {
            name: 'Arizalar',
            link: '/admin/applications'
        },
        {
            name: 'Asosiy yonalishlar',
            link: '/admin/main-direction'
        },
        {
            name: 'Yangiliklar',
            link: '/admin/news'
        },
        {
            name: 'Reklama',
            link: '/admin/ads'
        },
        {
            name: 'Talim tili',
            link: '/admin/edu-lang'
        },
        {
            name: 'Regionlar',
            link: '/admin/regions'
        },
        {
            name: 'Tizim userlari',
            link: '/admin/system-users'
        },
        {
            name: 'Bot userlari',
            link: '/admin/bot-users'
        },
        {
            name: 'Xabar',
            link: '/admin/sms'
        },
    ]


    return (
        <nav className={`nav ${openMenu ? 'open' : ''}`}>
            <ul className="nav__list">
                {
                    nav.map((item, i) => (
                        <li className="nav__item" onClick={() => setOpenMenu(false)} key={i}>
                            <NavLink className='nav__link row between align-center' to={item.link}>
                                <span>{ item.name }</span>
                                <i className="fa-solid fa-chevron-right icon"/>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default AdminNavBar;