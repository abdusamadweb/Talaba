import React from 'react';
import './NavBar.scss'
import {NavLink, useHref} from "react-router-dom";
import {hiddenRoutesNav} from "../../assets/scripts/mockAPI.js";

const NavBar = () => {

    const href = useHref({})
    const isHidden = hiddenRoutesNav.some(route => href.includes(route))


    return (
        <nav className={`nav-bar ${isHidden ? 'd-none' : ''}`}>
            <ul className="nav-bar__list">
                <li className="item">
                    <NavLink className='item__link' to='/'>
                        <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_616_2800)">
                                <path
                                    d="M22.992 9.98047C22.992 10.6836 22.3931 11.2344 21.7142 11.2344H20.4365L20.4644 17.4922C20.4644 17.5977 20.4564 17.7031 20.4444 17.8086V18.4375C20.4444 19.3008 19.7297 20 18.8472 20H18.2083C18.1644 20 18.1205 20 18.0766 19.9961C18.0207 20 17.9648 20 17.9089 20H16.6111H15.6528C14.7703 20 14.0556 19.3008 14.0556 18.4375V17.5V15C14.0556 14.3086 13.4845 13.75 12.7778 13.75H10.2222C9.51545 13.75 8.94444 14.3086 8.94444 15V17.5V18.4375C8.94444 19.3008 8.22969 20 7.34722 20H6.38889H5.1151C5.05521 20 4.99531 19.9961 4.93542 19.9922C4.8875 19.9961 4.83958 20 4.79167 20H4.15278C3.27031 20 2.55556 19.3008 2.55556 18.4375V14.0625C2.55556 14.0273 2.55556 13.9883 2.55955 13.9531V11.2344H1.27778C0.559028 11.2344 0 10.6875 0 9.98047C0 9.62891 0.119792 9.31641 0.399306 9.04297L10.6375 0.3125C10.917 0.0390625 11.2365 0 11.516 0C11.7955 0 12.1149 0.078125 12.3545 0.273438L22.5528 9.04297C22.8722 9.31641 23.0319 9.62891 22.992 9.98047Z"
                                    fill="#3F3F3F"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_616_2800">
                                    <rect width="23" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="txt">Asosiy</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className='item__link' to='/search'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.5 2C6.26 2 2 6.26 2 11.5C2 16.74 6.26 21 11.5 21C16.74 21 21 16.74 21 11.5C21 6.26 16.74 2 11.5 2ZM11.5 13.75H8.5C8.09 13.75 7.75 13.41 7.75 13C7.75 12.59 8.09 12.25 8.5 12.25H11.5C11.91 12.25 12.25 12.59 12.25 13C12.25 13.41 11.91 13.75 11.5 13.75ZM14.5 10.75H8.5C8.09 10.75 7.75 10.41 7.75 10C7.75 9.59 8.09 9.25 8.5 9.25H14.5C14.91 9.25 15.25 9.59 15.25 10C15.25 10.41 14.91 10.75 14.5 10.75Z"
                                fill="#3F3F3F"/>
                            <path
                                d="M22.1367 22C21.9155 22 21.6943 21.9139 21.5346 21.754L19.2488 19.4666C18.9171 19.1345 18.9171 18.5934 19.2488 18.249C19.5806 17.917 20.1214 17.917 20.4654 18.249L22.7512 20.5365C23.0829 20.8686 23.0829 21.4097 22.7512 21.754C22.5791 21.9139 22.3579 22 22.1367 22Z"
                                fill="#3F3F3F"/>
                        </svg>
                        <span className="txt">Qidirish</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className='item__link' to='/applications'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.35 2H9.64999C8.60999 2 7.75999 2.84 7.75999 3.88V4.82C7.75999 5.86 8.59999 6.7 9.63999 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                                fill="#3F3F3F"/>
                            <path
                                d="M17.24 4.81998C17.24 6.40998 15.94 7.70998 14.35 7.70998H9.64999C8.05999 7.70998 6.75999 6.40998 6.75999 4.81998C6.75999 4.25998 6.15999 3.90998 5.65999 4.16998C4.24999 4.91998 3.28999 6.40998 3.28999 8.11998V17.53C3.28999 19.99 5.29999 22 7.75999 22H16.24C18.7 22 20.71 19.99 20.71 17.53V8.11998C20.71 6.40998 19.75 4.91998 18.34 4.16998C17.84 3.90998 17.24 4.25998 17.24 4.81998ZM12.38 16.95H7.99999C7.58999 16.95 7.24999 16.61 7.24999 16.2C7.24999 15.79 7.58999 15.45 7.99999 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95ZM15 12.95H7.99999C7.58999 12.95 7.24999 12.61 7.24999 12.2C7.24999 11.79 7.58999 11.45 7.99999 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                                fill="#3F3F3F"/>
                        </svg>
                        <span className="txt">Arizalar</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className='item__link' to='/profile'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                fill="#3F3F3F"/>
                            <path
                                d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z"
                                fill="#3F3F3F"/>
                        </svg>
                        <span className="txt">Profil</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;