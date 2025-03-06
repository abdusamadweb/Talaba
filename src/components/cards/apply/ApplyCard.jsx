import React from 'react';
import './ApplyCard.scss'
import langIcon from '../../../assets/images/language-icon.svg'
import eduIcon from '../../../assets/images/book-icon.svg'
import conIcon from '../../../assets/images/dollar-icon.svg'
import {Link} from "react-router";
import {formatPrice} from "../../../assets/scripts/global.js";

const ApplyCard = ({ title, name, bgImg, logo, lang, edu, contract, close, ad }) => {
    return (
        !ad ?
            <li className='apply-card'>
                <div className="apply-card__head" style={{backgroundImage: `url(${bgImg})`}}>
                    <div className='index'>
                        <h3 className="title">{title}</h3>
                        <span className='name'>{name}</span>
                        <div className='img'>
                            <img src={logo} alt="logo"/>
                        </div>
                    </div>
                    <div className='overlay'/>
                </div>
                <div className="apply-card__body">
                    <div className="mb1">
                        <ul className="list">
                            <li className='item'>
                                <div className='row align-center'>
                                    <img className='item__img' src={langIcon} alt="icon"/>
                                    <span className='txt'>Ta’lim tili</span>
                                </div>
                                <span className='item__title'>{lang}</span>
                            </li>
                            <li className='item'>
                                <div className='row align-center'>
                                    <img className='item__img' src={eduIcon} alt="icon"/>
                                    <span className='txt'>Ta’lim shakli</span>
                                </div>
                                <span className='item__title'>{edu}</span>
                            </li>
                        </ul>
                        <div className='item pt1'>
                            <div className='row align-center'>
                                <img className='item__img' src={conIcon} alt="icon"/>
                                <span className='txt'>Kontrakt to’lovi</span>
                            </div>
                            <span className='item__title'>{formatPrice(contract)} so’mdan boshlab</span>
                        </div>
                    </div>
                    <div className="btns align-center">
                        <Link className='btn btn1' to='/'>Batafsil</Link>
                        <Link className={`btn btn2 ${close ? 'btn2-red' : ''} `} to={!close ? `/uni` : null}>
                            { !close ? 'Hujjat topshirish' : 'Qabul yopilgan' }
                        </Link>
                    </div>
                </div>
            </li>
            :
            <li className='ad'>
                <a className='ad__link' href='/'>
                    <img src={ad} alt="ad-img"/>
                </a>
            </li>
    );
};

export default ApplyCard;