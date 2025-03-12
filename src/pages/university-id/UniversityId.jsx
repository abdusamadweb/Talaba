import React, {useState} from 'react';
import './UniversityId.scss'
import arrow from '../../assets/images/arrow-icon.svg'
import file from '../../assets/images/file-icoc.svg'
import img from '../../assets/images/news-test.png'
import {Link, useNavigate} from "react-router";
import {Carousel, Drawer, Image, Segmented, Tabs} from "antd";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import langIcon from "../../assets/images/language-icon.svg";
import eduIcon from "../../assets/images/book-icon.svg";
import conIcon from "../../assets/images/dollar-icon.svg";
import teacherIcon from "../../assets/images/teacher-icon.svg";

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

const Direction = ({ setModal }) => {

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
                            <li
                                className="item"
                                onClick={() => setModal(true)}
                            >
                                Bank ishi va auditi
                            </li>
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

    const [modal, setModal] = useState(false)

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
            children: <Direction setModal={setModal} />,
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

            <Drawer
                rootClassName='filter-modal-up'
                className='filter-modal about-modal'
                placement='bottom'
                closable={false}
                onClose={() => setModal(false)}
                open={modal}
                key='bottom'
            >
                <div className='sticky'>
                    <span className='line'/>
                    <h3 className="title">Boshkang’ich ta’lim</h3>
                </div>
                <ul className="list row">
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={langIcon} alt="icon"/>
                            <span className='txt'>Ta’lim tili</span>
                        </div>
                        <span className='item__title'>{'lang'}</span>
                    </li>
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={eduIcon} alt="icon"/>
                            <span className='txt'>Ta’lim shakli</span>
                        </div>
                        <span className='item__title'>{'edu'}</span>
                    </li>
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={conIcon} alt="icon"/>
                            <span className='txt'>Kunduzgi</span>
                        </div>
                        <span className='item__title'>{'formatPrice(contract)'} so’mdan boshlab</span>
                    </li>
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={conIcon} alt="icon"/>
                            <span className='txt'>Sirtqi</span>
                        </div>
                        <span className='item__title'>{'formatPrice(contract)'} so’mdan boshlab</span>
                    </li>

                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={teacherIcon} alt="icon"/>
                            <span className='txt'>Kunduzgi</span>
                        </div>
                        <span className='item__title'>{'4 yil'}</span>
                    </li>
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={teacherIcon} alt="icon"/>
                            <span className='txt'>Sirtqi</span>
                        </div>
                        <span className='item__title'>{'5 yil'}</span>
                    </li>
                </ul>
                <div className="titles">
                    <span className='title'>Yo'nalish haqida</span>
                    <p className="desc">
                        Boshlang‘ich ta’lim sohasida kamida 5 yillik
                        tajribaga ega bo'lish (Sirtqi uchun)
                        Boshlang‘ich ta’lim - Boshlang‘ich ta’lim ta’lim
                        yo‘nalishi bo‘yicha bakalavrlar tayyorlovchi oliy
                        ta’limning dasturi asosida amalga oshiriladi,
                        uning nazariy va amaliy mashg‘ulotlarini to‘liq
                        o‘zlashtirgan, yakuniy davlat attestatsiyasidan
                        muvaffaqiyatli o‘tgan shaxsga «bakalavr»
                        malakasi (darajasi) hamda oliy ma’lumot
                        to‘g‘risidagi davlat namunasidagi rasmiy
                        hujjat(lar) beriladi
                    </p>
                </div>
                <div className='btns'>
                    <button className='btn'>Hujjat topshirish</button>
                </div>
            </Drawer>
        </div>
    );
};

export default UniversityId;