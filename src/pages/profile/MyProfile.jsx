import React from 'react';
import './Profile.scss'
import arrow from "../../assets/images/arrow-icon-white.svg";
import profile from '../../assets/images/user-img.svg'
import editIcon from '../../assets/images/edit-icon-profile.svg'
import addIcon from '../../assets/images/add-icon-profile.svg'
import {Link, useNavigate} from "react-router-dom";
import {Upload} from "antd";
import {API_TEST} from "../../api/apiConfig.js";
import toast from "react-hot-toast";
import GetFile from "../../components/get-file/GetFile.jsx";
import {formatPhone} from "../../assets/scripts/global.js";


// upload
const props = {
    name: 'file',
    action: API_TEST + '/upload-file',
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            toast.success(`${info.file.name} yuklandi! ✅`);
        } else if (info.file.status === 'error') {
            toast.error(`${info.file.name} xatolik! ❌`);
            toast.custom(info.response.message);
        }
    },
}


const MyProfile = () => {

    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('user'))


    return (
        <div className='my-profile page'>
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
                                <GetFile className='img' id={userData?.avatar_id} defImg={profile}/>
                                <span className='name'>{userData?.first_name + ' ' + userData?.last_name}</span>
                            </div>
                            <Link className='edit-btn' to='/profile/me/edit'>
                                <img src={editIcon} alt="edit-icon"/>
                            </Link>
                        </div>
                        <ul className="info__body">
                            <li className="item">
                                <span className="item__label">Passport yoki ID karta seriya raqami</span>
                                <span className="item__title">{userData?.passport_code || 'Mavjud emas'}</span>
                            </li>
                            {/*<li className="item">*/}
                            {/*    <span className="item__label">JSHSHIR (PINFL)</span>*/}
                            {/*    <span className="item__title">{userData?.passport_pinfl || 'Mavjud emas'}</span>*/}
                            {/*</li>*/}
                            <li className="item">
                                <span className="item__label">Tug’ilgan kun</span>
                                <span
                                    className="item__title">{new Date(userData?.birth_date).toLocaleDateString()}</span>
                            </li>
                            {/*<li className="item">*/}
                            {/*    <span className="item__label">Jinsi</span>*/}
                            {/*    <span className="item__title">{userData?.gender || 'Mavjud emas'}</span>*/}
                            {/*</li>*/}
                            <li className="item">
                                <span className="item__label">Telefon raqam</span>
                                <span className="item__title">{formatPhone(userData?.phone_number || '000')}</span>
                            </li>
                            {/*<li className="item">*/}
                            {/*    <span className="item__label">Email</span>*/}
                            {/*    <span className="item__title">{userData?.email || 'Mavjud emas'}</span>*/}
                            {/*</li>*/}
                            <li></li>
                            <li className="item">
                                <span className="item__label">Passport yoki ID karta nusxasi</span>
                                <div className="item__imgs">
                                    <GetFile className='ant-image-img' id={userData?.passport_file_id}/>
                                </div>
                            </li>
                            <li className="item">
                                <span className="item__label">Diplom, shahodatnoma nusxasi</span>
                                <div className="item__imgs">
                                    <GetFile className='ant-image-img' id={userData?.diploma_file_id}/>
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