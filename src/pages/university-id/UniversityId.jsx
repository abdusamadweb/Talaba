import React, {useState} from 'react';
import './UniversityId.scss'
import arrow from '../../assets/images/arrow-icon.svg'
import file from '../../assets/images/file-icoc.svg'
import {useNavigate, useParams} from "react-router-dom";
import {Carousel, Drawer, Empty, Segmented, Skeleton} from "antd";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import langIcon from "../../assets/images/language-icon.svg";
import eduIcon from "../../assets/images/book-icon.svg";
import conIcon from "../../assets/images/dollar-icon.svg";
import teacherIcon from "../../assets/images/teacher-icon.svg";
import {$resp} from "../../api/apiResp.js";
import {useQuery} from "@tanstack/react-query";
import GetFile from "../../components/get-file/GetFile.jsx";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";

const About = ({ data }) => {

    const [show, setShow] = useState(false)

    return (
        <div className='about tab' id='about'>
            <p className="about__title">OTM haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Universitet haqida :</span>
                    <p className={`desc ${show ? 'show' : ''}`}>{data?.data.desc}</p>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    { !show ? 'Ko’proq ko’rish' : 'Yopish' }
                    { !show ? <CaretDownOutlined/> : <CaretUpOutlined/> }
                </button>
            </div>
        </div>
    )
}

const Grand = ({ data }) => {

    const [show, setShow] = useState(false)

    return (
        <div className='about tab' id='grand'>
            <p className="about__title">Grandlar haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Grandlar haqida :</span>
                    <p className={`desc ${show ? 'show' : ''}`}>{ data?.data.grands || 'Mavjud emas' }</p>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    { !show ? 'Ko’proq ko’rish' : 'Yopish' }
                    { !show ? <CaretDownOutlined/> : <CaretUpOutlined/> }
                </button>
            </div>
        </div>
    )
}

const Direction = ({ setModal, data }) => {

    const [show, setShow] = useState(true)

    const [selectedTab, setSelectedTab] = useState(data?.[0]?.name || "")
    const selectedDirections = data?.find(i => i.name === selectedTab)?.edu_directions || []

    return (
        <div className='about tab' id='direction'>
            <p className="about__title">Yo'nalishlar haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Yo'nalishlar haqida :</span>
                    <div className='content'>
                        <Segmented
                            options={data?.map(i => `${i.name} (${i.edu_directions?.length || 0})`)}
                            onChange={value => setSelectedTab(value.split(" (")[0])} // Убираем число из строки
                        />
                        <ul className={`content__list listDir ${show ? 'showDir' : ''}`}>
                            {selectedDirections.map(dir => (
                                <li key={dir.id} className="item" onClick={() => setModal(true)}>
                                    {dir.name}
                                </li>
                            ))}
                            <li className="item">1</li>
                            <li className="item">1</li>
                            <li className="item">1</li>
                            <li className="item">1</li>
                            <li className="item">1</li>
                            <li className="item">1</li>
                        </ul>
                    </div>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    {show ? 'Ko’proq ko’rish' : 'Yopish'}
                    {show ? <CaretDownOutlined/> : <CaretUpOutlined/>}
                </button>
            </div>
        </div>
    )
}

const Gallery = ({data}) => {
    return (
        <div className='about tab gallery' id='gallery'>
            <p className="about__title">Galereya</p>
            <div className="about__info">
                {
                    data?.data.length > 0 ?
                        <Carousel arrows infinite dots={false}>
                            {
                                data?.data.map((i, index) => (
                                    <GetFileDef key={index} id={i} />
                                ))
                            }
                        </Carousel>
                        : <Empty description='Rasmlar yoq'/>
                }
            </div>
        </div>
    )
}

// fetch data
const fetchUniversity = async (id) => {
    const { data } = await $resp.get(`/university/get/${id}`)
    return data
}
const fetchDirection = async (id) => {
    const { data } = await $resp.get(`/edu-d-group/all-by-unv/${id}`)
    return data
}
const fetchGallery = async (id) => {
    const { data } = await $resp.get(`/gallery/get-by-unv/${id}`)
    return data
}


const UniversityId = () => {

    const { id } = useParams()

    const [modal, setModal] = useState(false)
    const navigate = useNavigate()


    // fetch university
    const { data, isLoading } = useQuery({
        queryKey: ['universityId', id],
        queryFn: () => fetchUniversity(id),
        enabled: !!id,
        keepPreviousData: true
    })

    // fetch gallery
    const { data: gallery, isLoading: isLoadingGallery } = useQuery({
        queryKey: ['gallery', id],
        queryFn: () => fetchGallery(id),
        enabled: !!id,
        keepPreviousData: true
    })

    // fetch direction
    const { data: direction, isLoading: isLoadingDirection } = useQuery({
        queryKey: ['direction', id],
        queryFn: () => fetchDirection(id),
        enabled: !!id,
        keepPreviousData: true
    })
    console.log(direction)


    // tabs
    const [activeTab, setActiveTab] = useState("#about")

    const tabs = [
        { id: "#about", label: "OTM haqida" },
        { id: "#grand", label: "Grandlar" },
        { id: "#direction", label: "Yo’nalishlar" },
        { id: "#gallery", label: "Galereya" }
    ]


    return (
        <div className="university page">
            <div className="container">
                <div className="university__back">
                    <button className="btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="icon"/>
                    </button>
                    <span className="txt">Ortga</span>
                </div>
                {
                    isLoading ? <div className='p1 pb3'>
                            <Skeleton active/> <br/>
                            <Skeleton active/> <br/>
                            <Skeleton active/> <br/>
                            <Skeleton active title={false}/>
                        </div>
                        :
                        <div className="university__head">
                            <div className="titles row align-center">
                                <div className="imgs grid-center">
                                    <GetFile id={data?.data.logo_id} />
                                </div>
                                <div>
                                    <p className="name fw500">{data?.data.name}</p>
                                    <span className="city">{data?.data.address}</span>
                                </div>
                            </div>
                            <div className="license">
                                <div className="row">
                                    <img className='img' src={file} alt="icon"/>
                                    <div>
                                        <span className='txt'>OTM litsenziyasi</span>
                                        <a className='link' href={data?.data.site} target='_blank'>Litsenziyani ko’rish</a>
                                    </div>
                                </div>
                            </div>
                            <div className="tabs">
                                <ul className='tabs__list'>
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <a
                                                className={`item ${activeTab === tab.id ? "active" : ""}`}
                                                href={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                            >
                                                {tab.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <About data={data} />
                                <Grand data={data} />
                                <Direction setModal={setModal} data={direction} />
                                <Gallery data={gallery} />
                            </div>
                        </div>
                }
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