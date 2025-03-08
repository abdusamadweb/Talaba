import React from 'react';
import './Applications.scss'
import img404 from '../../assets/images/applications404-icon.svg'
import {formatPrice} from "../../assets/scripts/global.js";
import {Steps} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const app404 = <div className="d404">
            <div className="wrapper">
                <img className="d404__img" src={img404} alt="icon"/>
                <div className='d404__titles'>
                    <p className="title">Arizalar mavjud emas</p>
                    <p className="desc">Siz hali hech qanday arizalar mavjud emas</p>
                </div>
                <button className='d404__btn'>Hujjat topshirish</button>
            </div>
        </div>

const Applications = () => {

    const title = null
    const name = null
    const logo = null
    const bgImg = null
    const degree = 'asd'
    const lang = 'Amadr'
    const edu = 'Faza'
    const contract = null


    return (
        <div className='applications'>
            <div className="container">
                <ul className="applications__list">
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
                                        <span className='txt'>Daraja</span>
                                        <span className='item__title'>{degree}</span>
                                    </li>
                                    <li className='item'>
                                        <span className='txt'>Ta’lim tili</span>
                                        <span className='item__title'>{lang}</span>
                                    </li>
                                    <li className='item'>
                                        <span className='txt'>Ta’lim shakli</span>
                                        <span className='item__title'>{edu}</span>
                                    </li>
                                    <li className='item'>
                                        <span className='txt'>Kontrakt to’lovi</span>
                                        <span className='item__title'>{formatPrice(contract)} UZS</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="status">
                                <Steps
                                    size="small"
                                    type="inline"
                                    responsive={false}
                                    current={1}
                                    items={[
                                        {
                                            title: '',
                                        },
                                        {
                                            title: '',
                                        },
                                        {
                                            title: ''
                                        },
                                        {
                                            title: ''
                                        },
                                        {
                                            title: ''
                                        },
                                    ]}
                                />
                                <p className="status__title">
                                    Holati:
                                    <span>{ 'Kutilmoqda' }</span>
                                </p>
                            </div>
                            <button className='btn btn2-red'>Arizani bekor qilish</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Applications;