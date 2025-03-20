import React from 'react';
import './Profile.scss'
import arrow from "../../assets/images/arrow-icon-white.svg";
import profile from '../../assets/images/user-img.svg'
import editIcon from '../../assets/images/edit-icon-profile.svg'
import addIcon from '../../assets/images/add-icon-profile.svg'
import {useNavigate} from "react-router";
import {Image, message, Upload} from "antd";
import {API_TEST} from "../../api/apiConfig.js";
import toast from "react-hot-toast";

const MyProfile = () => {

    const navigate = useNavigate()

    // upload
    const props = {
        name: 'file',
        action: API_TEST + '/upload-file',
        headers: {
            authorization: localStorage.getItem('token'),
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                toast.success(`${info.file.name} yuklandi! ✅`);
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} xatolik! ❌`);
            }
        },
    }


    return (
        <div className='my-profile'>
            <div className="container">
                <div className="my-profile__back">
                    <button className="btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="icon"/>
                    </button>
                    <span className="txt">Mening profilim</span>
                </div>
                <div className="my-profile__body">
                    <p className="title">Shaxsiy ma'lumotlar</p>
                    <div className="info">
                        <div className="info__head row between">
                            <div className="row align-center">
                                <img className='img' src={profile} alt="profile-img"/>
                                <span className='name'>Ism Familiya</span>
                            </div>
                            <button className='edit-btn'>
                                <img src={editIcon} alt="edit-icon"/>
                            </button>
                        </div>
                        <ul className="info__body">
                            <li className="item">
                                <span className="item__label">Passport yoki ID karta seriya raqami</span>
                                <span className="item__title">AC 222 22 22</span>
                            </li>
                            <li className="item">
                                <span className="item__label">JSHSHIR (PINFL)</span>
                                <span className="item__title">Mavjud emas</span>
                            </li>
                            <li className="item">
                                <span className="item__label">Tug’ilgan kun</span>
                                <span className="item__title">20.12.2002</span>
                            </li>
                            <li className="item">
                                <span className="item__label">Jinsi</span>
                                <span className="item__title">Erkak</span>
                            </li>
                            <li className="item">
                                <span className="item__label">Telefon raqam</span>
                                <span className="item__title">+998 99 999 99 99</span>
                            </li>
                            <li className="item">
                                <span className="item__label">Email</span>
                                <span className="item__title">ikromakbarov@gmail.com</span>
                            </li>
                            <li className="item">
                                <span className="item__label">Passport yoki ID karta nusxasi</span>
                                <div className="item__imgs">
                                    <Image src={profile} />
                                    <Image src={profile} />
                                </div>
                            </li>
                            <li className="item">
                                <span className="item__label">Diplom, shahodatnoma nusxasi</span>
                                <div className="item__imgs">
                                    <Image src={profile}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul className="files">
                        <li className="item">
                            <Upload {...props}>
                                <div className="grid between">
                                    <p className="item__title">Sertifikat</p>
                                    <img src={addIcon} alt="icon"/>
                                </div>
                                <p className="item__desc">Sertifikatingiz mavjudmi? Agar mavjud
                                    bo'lsa, sertifikat ma'lumotlarini kiriting</p>
                            </Upload>
                        </li>
                        <li className="item">
                            <Upload {...props}>
                                <div className="grid between">
                                    <p className="item__title">DTM test natijasi</p>
                                    <img src={addIcon} alt="icon"/>
                                </div>
                                <p className="item__desc">Bu yilgi DTM test natijasi sizda mavjudmi?
                                    Agar mavjud bo'lsa, DTM test natijalarini kiriting</p>
                            </Upload>
                        </li>
                        <li className="item">
                            <Upload {...props}>
                                <div className="grid between">
                                    <p className="item__title">Ota-onasining to’liq ismi
                                        sharifi va telefon raqami</p>
                                    <img src={addIcon} alt="icon"/>
                                </div>
                                <p className="item__desc">Zarur vaqtlarda aloqaga chiqish uchun
                                    ota-onagizni ism sharifi va telifon nomerini kiriting</p>
                            </Upload>
                        </li>
                        <li className="item">
                            <Upload {...props}>
                                <div className="grid between">
                                    <p className="item__title">Nogironlik haqida
                                        ma'lumotnoma</p>
                                    <img src={addIcon} alt="icon"/>
                                </div>
                                <p className="item__desc">Nogironlik haqida ma’lumotnomaga ega bo’sangiz
                                    uni tizmga kiriting va imtiyozga ega bo’ling</p>
                            </Upload>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;