import React, {useState} from 'react';
import './Header.scss'
import logo from '../../assets/images/logo.svg'
import menu from '../../assets/images/menu-icon.svg'
import {Link} from "react-router";
import {Drawer, Input} from "antd";
import arrowIcon from '../../assets/images/arrow-icon.svg'
import searchIcon from "../../assets/images/search-icon.svg";
import {CloseCircleOutlined} from "@ant-design/icons";

const Header = () => {

    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')


    return (
        <div className='header'>
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
                <div className="header-modal__head">
                    <button className='btn' onClick={() => setModal(false)}>
                        <img src={arrowIcon} alt="icon"/>
                    </button>
                    <div className='search-filter'>
                        <Input
                            size="large"
                            prefix={<img src={searchIcon} alt='icon'></img>}
                            suffix={<CloseCircleOutlined onClick={() => setSearch('')} />}
                            placeholder="OTM yoki ta’lim yo’nalishi..."
                        />
                    </div>
                </div>
                <div className="header-modal__body">
                    <div className="uni-dir">
                        <h3 className="uni-dir__title">Ko’p qidirilgan yo’nalishlar</h3>
                        <ul className="uni-dir__list">
                            <li className="item">
                                <Link className='item__link' to='/'>Iqtisodiyot, buxgalteriya hisobi va soliqqa tortish</Link>
                            </li>
                            <li className="item">
                                <Link className='item__link' to='/'>Iqtisodiyot, buxgalteriya hisobi va soliqqa tortish</Link>
                            </li>
                            <li className="item">
                                <Link className='item__link' to='/'>Iqtisodiyot, buxgalteriya hisobi va soliqqa tortish</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="uni-dir">
                        <h3 className="uni-dir__title">Ko’p qidirilgan OTMlar</h3>
                        <ul className="uni-dir__list">
                            <li className="item">
                                <Link className='item__link' to='/'>Xalqaro TMC instituti</Link>
                            </li>
                            <li className="item">
                                <Link className='item__link' to='/'>Xalqaro TMC instituti</Link>
                            </li>
                            <li className="item">
                                <Link className='item__link' to='/'>Xalqaro TMC instituti</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Header;