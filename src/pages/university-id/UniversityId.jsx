import React, {use, useState} from 'react';
import './UniversityId.scss'
import arrow from '../../assets/images/arrow-icon.svg'
import file from '../../assets/images/file-icoc.svg'
import img from '../../assets/images/news-test.png'
import {Link, useNavigate} from "react-router";
import {Carousel, Segmented, Tabs, Image} from "antd";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";

const About = () => {

    const [show, setShow] = useState(false)

    return (
        <div className='about tab'>
            <p className="about__title">OTM haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Universitet haqida :</span>
                    <p className={`desc ${show ? 'show' : ''}`}>Universitetning asosiy vazifasi ilm-fan
                        va ishlab chiqarish o‘rtasidagi
                        hamkorlikni mustahkamlash orqali
                        ijtimoiy-iqtisodiy barqaror rivojlanishni
                        hamkorlikni mustahkamlash orqali
                        ijtimoiy iqtisodiy barqaror rivojlanishni</p>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    { !show ? 'Ko’proq ko’rish' : 'Yopish' }
                    { !show ? <CaretDownOutlined/> : <CaretUpOutlined/> }
                </button>
            </div>
        </div>
    )
}

const Grand = () => {

    const [show, setShow] = useState(false)

    return (
        <div className='about tab'>
            <p className="about__title">Grandlar haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Grandlar haqida :</span>
                    <p className={`desc ${show ? 'show' : ''}`}>Universitetning asosiy vazifasi ilm-fan
                        va ishlab chiqarish o‘rtasidagi
                        hamkorlikni mustahkamlash orqali
                        ijtimoiy-iqtisodiy barqaror rivojlanishni
                        hamkorlikni mustahkamlash orqali
                        ijtimoiy iqtisodiy barqaror rivojlanishni</p>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    { !show ? 'Ko’proq ko’rish' : 'Yopish' }
                    { !show ? <CaretDownOutlined/> : <CaretUpOutlined/> }
                </button>
            </div>
        </div>
    )
}

const Direction = () => {

    const [show, setShow] = useState(false)
    const [tab, setTab] = useState(false)

    return (
        <div className='about tab'>
            <p className="about__title">Yo'nalishlar haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Yo'nalishlar haqida :</span>
                    <div className='content'>
                        <Segmented
                            options={[`Bakalavr ${(33)}`, `Magistratura ${(8)}`]}
                            onChange={() => setTab(!tab)}
                        />
                        <ul className={`content__list ${show ? 'show' : ''}`}>
                            <li className="item">Bank ishi va auditi</li>
                            <li className="item">Bank ishi va auditi</li>
                            <li className="item">Bank ishi va auditi</li>
                            <li className="item">Iqtisodiyot (tarmoqlar va saholar bo'yicha)</li>
                            <li className="item">Iqtisodiyot (tarmoqlar va saholar bo'yicha)</li>
                            <li className="item">Iqtisodiyot (tarmoqlar va saholar bo'yicha)</li>
                        </ul>
                    </div>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    { !show ? 'Ko’proq ko’rish' : 'Yopish' }
                    { !show ? <CaretDownOutlined/> : <CaretUpOutlined/> }
                </button>
            </div>
        </div>
    )
}

const Gallery = () => {
    return (
        <div className='about tab gallery'>
            <p className="about__title">Galereya</p>
            <div className="about__info">
                <Carousel arrows infinite dots={false}>
                    <Image src={img} />
                    <Image src={img} />
                    <Image src={img} />
                </Carousel>
            </div>
        </div>
    )
}

const UniversityId = () => {

    const navigate = useNavigate()
    const tabs = [
        {
            key: '1',
            label: 'OTM haqida',
            children: <About />,
        },
        {
            key: '2',
            label: 'Grandlar',
            children: <Grand />,
        },
        {
            key: '3',
            label: 'Yo’nalishlar',
            children: <Direction />,
        },
        {
            key: '4',
            label: 'Galereya',
            children: <Gallery />,
        },
    ]


    return (
        <div className="university">
            <div className="container">
                <div className="university__back">
                    <button className="btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="icon"/>
                    </button>
                    <span className="txt">Ortga</span>
                </div>
                <div className="university__head">
                    <div className="titles row align-center">
                        <div className="imgs grid-center">
                            <img src={1} alt="logo"/>
                        </div>
                        <div>
                            <p className="name fw500">Iqtisodiyot va pedagogika universiteti</p>
                            <span className="city">Qarshi shahri</span>
                        </div>
                    </div>
                    <div className="license">
                        <div className="row">
                            <img className='img' src={file} alt="icon"/>
                            <div>
                                <span className='txt'>OTM litsenziyasi</span>
                                <Link className='link' to=''>Litsenziyani ko’rish</Link>
                            </div>
                        </div>
                    </div>
                    <Tabs
                        rootClassName='tabs'
                        defaultActiveKey="1"
                        items={tabs}
                        centered={true}
                        // onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UniversityId;