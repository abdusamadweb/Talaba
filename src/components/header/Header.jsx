import React from 'react';
import './Header.scss'
import logo from '../../assets/images/logo.svg'
import menu from '../../assets/images/menu-icon.svg'
import {Link} from "react-router";

const Header = () => {
    return (
        <div className='header'>
            <div className="container row between align-center">
                <Link className='header__logo' to='/'>
                    <img src={logo} alt="logo"/>
                </Link>
                <button className='header__menu'>
                    <img src={menu} alt="menu-icon"/>
                </button>
            </div>
        </div>
    );
};

export default Header;