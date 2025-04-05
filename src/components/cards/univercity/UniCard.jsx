import React from 'react';
import './UniCard.scss'
import overlay from '../../../assets/images/overlay.png'
import {SelectOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import GetFile from "../../get-file/GetFile.jsx";
import GetFileDef from "../../get-file/GetFileDef.jsx";
import defLogo from '../../../assets/images/avatar-uni.svg'
import defImg from '../../../assets/images/avatar-bg.jpeg'

const UniCard = ({ i }) => {

    const navigate = useNavigate()


    return (
        <li className='uni-card'>
            <div className="head row align-center r1" onClick={() => navigate(`/university/${i.id}`)}>
                <div className="head__img">
                    <GetFile id={i.logo_id} defImg={defLogo} />
                </div>
                <div>
                    <span className='head__name'>{i.name}</span>
                    <span className='head__city'>{ i.address }</span>
                </div>
                <div className='icon center-absolute'><SelectOutlined /></div>
            </div>
            <div className="body">
                <img className="body__overlay" src={overlay} alt='overlay'/>
                <GetFileDef className='img' id={i.photo_id} odiy defImg={defImg} />
                <p className="body__desc">{ i.desc }</p>
            </div>
        </li>
    );
};

export default UniCard;