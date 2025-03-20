import React from 'react';
import './Profile.scss'
import profileImg from '../../assets/images/user-img.svg'
import camera from '../../assets/images/camera.svg'
import userIcon from '../../assets/images/user-icon.svg'
import arrow from '../../assets/images/arrow-menu-icon.svg'
import clipboardIcon from '../../assets/images/clipboard-icon.svg'
import aloqaIcon from '../../assets/images/aloqa.svg'
import iIcon from '../../assets/images/i-icon.svg'
import logout from '../../assets/images/logout-icon.svg'
import {Link} from "react-router";

const Profile = () => {
    return (
        <div className='profile'>
            <div className="container">
                <div className="profile__head">
                    <div className="imgs">
                        <img className='img' src={profileImg} alt="profile"/>
                        <button className='btn'>
                            <img src={camera} alt="camera"/>
                        </button>
                    </div>
                    <p className="title">Ism Familya</p>
                </div>
                <div className="profile__body">
                    <div className='bg'/>
                    <ul className="list">
                        <li>
                            <Link className='link' to='/profile/me'>
                                <div className="row">
                                    <div className='width grid-center'>
                                        <img className='link__prefix' src={userIcon} alt="icon"/>
                                    </div>
                                    <span className='link__txt'>Shahsiy ma’lumotlar</span>
                                </div>
                                <img className='link__suffix' src={arrow} alt="icon"/>
                            </Link>
                        </li>
                        <li>
                        <Link className='link' to=''>
                                <div className="row">
                                    <div className='width grid-center'>
                                        <img className='link__prefix' src={clipboardIcon} alt="icon"/>
                                    </div>
                                    <span className='link__txt'>Mening arizalarim</span>
                                </div>
                                <img className='link__suffix' src={arrow} alt="icon"/>
                            </Link>
                        </li>
                        <li>
                        <Link className='link' to=''>
                                <div className="row">
                                    <div className='width grid-center'>
                                        <img className='link__prefix' src={aloqaIcon} alt="icon"/>
                                    </div>
                                    <span className='link__txt'>Aloqa markazi</span>
                                </div>
                                <img className='link__suffix' src={arrow} alt="icon"/>
                            </Link>
                        </li>
                        <li>
                        <Link className='link' to=''>
                                <div className="row">
                                    <div className='width grid-center'>
                                        <img className='link__prefix' src={iIcon} alt="icon"/>
                                    </div>
                                    <span className='link__txt'>Ilova haqida</span>
                                </div>
                                <img className='link__suffix' src={arrow} alt="icon"/>
                            </Link>
                        </li>
                    </ul>

                    <button className='logout link'>
                        <img className='link__prefix' src={logout} alt="icon"/>
                        <span className='link__txt'>Ilova haqida</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;