import React, {useState} from 'react';
import './Profile.scss'
import profile from '../../assets/images/user-img.svg'
import userIcon from '../../assets/images/user-icon.svg'
import arrow from '../../assets/images/arrow-menu-icon.svg'
import clipboardIcon from '../../assets/images/clipboard-icon.svg'
import aloqaIcon from '../../assets/images/aloqa.svg'
import iIcon from '../../assets/images/i-icon.svg'
import {Link, useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import {Button, Drawer, Modal} from "antd";
import GetFile from "../../components/get-file/GetFile.jsx";
import tel from "../../assets/images/tel-icon.svg";
import tg from "../../assets/images/tg-icon.svg";

const Profile = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const [info, setInfo] = useState(false)

    const userData = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        setIsLoading(true)

        localStorage.removeItem('user')
        localStorage.removeItem('user-state')
        localStorage.removeItem('token')

        setTimeout(() => {
            setIsLoading(false)
            navigate('/login')
        }, 1000)

        toast.success("Siz ilovadan chiqdingiz!")
    }


    return (
        <div className='profile page'>
            <div className="container">
                <div className="profile__head">
                    <div className="imgs">
                        <GetFile className='img' id={userData?.avatar_id} defImg={profile} />
                    </div>
                    <p className="title">{userData?.first_name} {userData?.last_name}</p>
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
                        <Link className='link' to='/applications'>
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
                            <button className='link' onClick={() => setInfo(true)}>
                                <div className="row">
                                    <div className='width grid-center'>
                                        <img className='link__prefix' src={aloqaIcon} alt="icon"/>
                                    </div>
                                    <span className='link__txt'>Aloqa markazi</span>
                                </div>
                                <img className='link__suffix' src={arrow} alt="icon"/>
                            </button>
                        </li>
                        <li>
                            <Link className='link' to=''>
                                <div className="row">
                                    <div className='width grid-center'>
                                        <img className='link__prefix' src={iIcon} alt="icon"/>
                                    </div>
                                    <span className='link__txt'>Biz haqimizda</span>
                                </div>
                                <img className='link__suffix' src={arrow} alt="icon"/>
                            </Link>
                        </li>
                    </ul>

                    {/*<button className='logout link' onClick={() => setModal(true)}>*/}
                    {/*    <img className='link__prefix' src={logout} alt="icon"/>*/}
                    {/*    <span className='link__txt'>Ilovadan chiqish</span>*/}
                    {/*</button>*/}
                </div>
            </div>
            <Modal
                rootClassName='cancel-modal'
                open={modal}
                centered
                footer={false}
                onCancel={() => setModal(false)}
            >
                <p className="title pt2">Ilovadan chiqishni xoxlaysizmi?</p>
                <p className="desc">Siz ilovadan chiqishni rostan xoxlaysizmi!?</p>
                <div className="btns">
                    <button className='btn' onClick={() => setModal(false)}>Yoq</button>
                    <Button
                        className="btn red"
                        size="large"
                        loading={isLoading}
                        onClick={logOut}
                    >
                        Ha
                    </Button>
                </div>
            </Modal>
            <Drawer
                rootClassName='filter-modal-up aloqa-modal'
                className='filter-modal about-modal'
                placement='bottom'
                closable={false}
                onClose={() => setInfo(false)}
                open={info}
            >
                <div className="title">Aloqa markazi</div>
                <div className='content'>
                    <a className='link' href="tel:+998998999777">
                        <img src={tel} alt="icon"/>
                        <span>+998 99 899 97 77</span>
                    </a>
                    <div>
                        <a className='link' href="https://t.me/nmadr" target='_blank'>
                            <img src={tg} alt="icon"/>
                            <span>Telegram orqali bog’lanish</span>
                        </a>
                    </div>
                    <Link className='link btn' to='/applications'>Hujjat topshirish</Link>
                </div>
            </Drawer>
        </div>
    );
};

export default Profile;