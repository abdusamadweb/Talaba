import React, {useState} from 'react';
import './Header.scss'
import logo from '../../assets/images/logo.svg'
import menu from '../../assets/images/menu-icon.svg'
import {Link, useHref} from "react-router-dom";
import {Drawer} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import tel from '../../assets/images/tel-icon.svg'
import tg from '../../assets/images/tg-icon.svg'
import {hiddenRoutes} from "../../assets/scripts/mockAPI.js";

const Header = () => {

    const [modal, setModal] = useState(false)

    const href = useHref({})
    const isHidden = hiddenRoutes.some(route => href.includes(route))


    return (
        <div className={`header ${isHidden ? 'd-none' : ''}`}>
            <div className="container row between align-center">
                <Link className='header__logo' to='/'>
                    <img src={logo} alt="logo"/>
                </Link>
                <button className='header__menu' onClick={() => setModal(true)}>
                    <img src={menu} alt="menu-icon"/>
                </button>
            </div>
            <Drawer
                rootClassName='header-modal'
                placement='right'
                closable={false}
                onClose={() => setModal(false)}
                open={modal}
                key='right'
            >
                <div className="row between align-center">
                    <Link className='header__logo' to='/'>
                        <img src={logo} alt="logo"/>
                    </Link>
                    <button className='header-modal__menu' onClick={() => setModal(false)}>
                        <CloseCircleOutlined />
                    </button>
                </div>
                <div className="header-modal__body">
                    <ul className="list">
                        <li onClick={() => setModal(false)}>
                            <a className='item' href='/#university'>OTMlar</a>
                        </li>
                        <li onClick={() => setModal(false)}>
                            <a className='item' href='/#directions'>Yo’nalishlar</a>
                        </li>
                        <li onClick={() => setModal(false)}>
                            <a className='item' href='/'>Hamkorlik</a>
                        </li>
                        <li onClick={() => setModal(false)}>
                            <a className='item' href='/'>Grantlar</a>
                        </li>
                        <li onClick={() => setModal(false)}>
                            <a className='item' href='/#news'>Yangliklar</a>
                        </li>
                        <li onClick={() => setModal(false)}>
                            <a className='item' href='/'>Biz haqimizda</a>
                        </li>
                    </ul>
                    <a className='link' href="tel:+998998999777">
                        <img src={tel} alt="icon"/>
                        <span>+998 99 899 97 77</span>
                    </a>
                    <a className='link' href="https://t.me/nmadr" target='_blank'>
                        <img src={tg} alt="icon"/>
                        <span>Telegram orqali bog’lanish</span>
                    </a>
                    <Link className='btn' to='/applications'>Hujjat topshirish</Link>
                </div>
            </Drawer>
        </div>
    );
};

export default Header;