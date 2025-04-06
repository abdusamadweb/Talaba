import React, {useEffect, useState} from 'react';
import './UniversityId.scss'
import arrow from '../../assets/images/arrow-icon.svg'
import file from '../../assets/images/file-icoc.svg'
import {useNavigate, useParams} from "react-router-dom";
import {Button, Carousel, Drawer, Empty, Form, Input, Modal, Segmented, Select, Skeleton, Upload} from "antd";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import langIcon from "../../assets/images/language-icon.svg";
import eduIcon from "../../assets/images/book-icon.svg";
import conIcon from "../../assets/images/dollar-icon.svg";
import teacherIcon from "../../assets/images/teacher-icon.svg";
import {$resp} from "../../api/apiResp.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import GetFile from "../../components/get-file/GetFile.jsx";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";
import {formatPrice} from "../../assets/scripts/global.js";
import successIcon from "../../assets/images/apply-success.svg";
import toast from "react-hot-toast";
import {API_TEST} from "../../api/apiConfig.js";
import defLogo from '../../assets/images/avatar-uni.svg'


const UploadIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.0833 8.49163H14.6749C12.6999 8.49163 11.0916 6.88329 11.0916 4.90829V2.49996C11.0916 2.04163 10.7166 1.66663 10.2583 1.66663H6.72492C4.15825 1.66663 2.08325 3.33329 2.08325 6.30829V13.6916C2.08325 16.6666 4.15825 18.3333 6.72492 18.3333H13.2749C15.8416 18.3333 17.9166 16.6666 17.9166 13.6916V9.32496C17.9166 8.86663 17.5416 8.49163 17.0833 8.49163ZM10.2333 13.15L8.56659 14.8166C8.50825 14.875 8.43325 14.925 8.35825 14.95C8.28325 14.9833 8.20825 15 8.12492 15C8.04158 15 7.96659 14.9833 7.89159 14.95C7.82492 14.925 7.75825 14.875 7.70825 14.825C7.69992 14.8166 7.69158 14.8166 7.69158 14.8083L6.02492 13.1416C5.78325 12.9 5.78325 12.5 6.02492 12.2583C6.26659 12.0166 6.66658 12.0166 6.90825 12.2583L7.49992 12.8666V9.37496C7.49992 9.03329 7.78325 8.74996 8.12492 8.74996C8.46659 8.74996 8.74992 9.03329 8.74992 9.37496V12.8666L9.34992 12.2666C9.59159 12.025 9.99158 12.025 10.2333 12.2666C10.4749 12.5083 10.4749 12.9083 10.2333 13.15Z"
                fill="#302E2B"/>
            <path
                d="M14.5251 7.3417C15.3167 7.35004 16.4167 7.35003 17.3584 7.35003C17.8334 7.35003 18.0834 6.7917 17.7501 6.45837C16.5501 5.25003 14.4001 3.07503 13.1667 1.8417C12.8251 1.50003 12.2334 1.73337 12.2334 2.20837V5.1167C12.2334 6.33337 13.2667 7.3417 14.5251 7.3417Z"
                fill="#302E2B"/>
        </svg>
    )
}

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

const Direction = ({ setModal, data, loading, setSelectedItem }) => {

    const [show, setShow] = useState(false)
    const [selectedTab, setSelectedTab] = useState("")

    useEffect(() => {
        if (data?.length) {
            setSelectedTab(data[0].name)
        }
    }, [data])

    const selectedDir = data?.find(i => i.name === selectedTab)?.edu_directions || []


    return (
        <div className='about tab' id='direction'>
            <p className="about__title">Yo'nalishlar haqida</p>
            <div className="about__info">
                <div className="titless">
                    <span className='title'>Yo'nalishlar haqida :</span>
                    <div className='content'>
                        <Segmented
                            options={data?.map(i => `${i.name} (${i.edu_directions?.length || 0})`)}
                            value={`${selectedTab} (${data?.find(i => i.name === selectedTab)?.edu_directions?.length || 0})`}
                            onChange={value => setSelectedTab(value.split(" (")[0])}
                        />
                        <ul className={`content__list listDir ${show ? 'showDir' : ''}`}>
                            {
                                loading ? <div className='p1 pb3'>
                                        <Skeleton active/> <br/>
                                        <Skeleton active/> <br/>
                                        <Skeleton active/>
                                    </div>
                                    : data?.length ?
                                        selectedDir.map(dir => (
                                            <li key={dir.id} className="item" onClick={() => {
                                                setModal(true)
                                                setSelectedItem(dir)
                                            }}>
                                                {dir.name}
                                            </li>
                                        ))
                                        : <Empty description={false} />
                            }
                        </ul>
                    </div>
                </div>
                <button className='btn' onClick={() => setShow(!show)}>
                    {!show ? 'Ko’proq ko’rish' : 'Yopish'}
                    {!show ? <CaretDownOutlined/> : <CaretUpOutlined/>}
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
                                data?.data.map((i, index) =>
                                    i.is_youtube ?
                                        <iframe className='iframe'
                                                src={i.link}
                                                title="YouTube video player" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen/>
                                        : <GetFileDef key={index} id={i.id} />
                                )
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

// upload files
const uploadProps = {
    name: 'file',
    maxCount: 1,
    action: API_TEST + '/upload-file',
    headers: {
        Authorization: localStorage.getItem('token'),
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file);
        }

        if (info.file.status === 'done') {
            toast.success(`${info.file.name} yuklandi! ✅`);
        } else if (info.file.status === 'error') {
            toast.error(`${info.file.name} xatolik! ❌`);
        }
    },
}

// fetch
const createApplication = async (body) => {
    const { data } = await $resp.post('/application/create', body)
    return data
}


const UniversityId = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [selectedItem, setSelectedItem] = useState(false)

    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const [price, setPrice] = useState(0)

    const userData = JSON.stringify('user')


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


    // tabs
    const [activeTab, setActiveTab] = useState("#about")
    const tabs = [
        { id: "#about", label: "OTM haqida" },
        { id: "#grand", label: "Grandlar" },
        { id: "#direction", label: "Yo’nalishlar" },
        { id: "#gallery", label: "Galereya" }
    ]


    // mutate
    const mutation = useMutation({
        mutationFn: createApplication,
        onSuccess: () => {
            toast.success('Ariza yuborildi!')
            form.resetFields() // Очищаем форму после успешной отправки

            setFile1(null)
            setFile2(null)

            setModalSuccess(true)
            setModal(false)
            setModal2(false)
            setLoading(false)
        },
        onError: (error) => {
            toast.error(`Xato: ${error.message}`)
            setLoading(false)
        }
    })

    const onFinish = (items) => {
        const body = {
            edu_direction_id: selectedItem.id,
            edu_lang_id: items.language,
            edu_type: items.type,
            diploma_id: items.docs.file.response?.files[0].id,
            photo_id: items.image.file.response?.files[0].id
        }

        setLoading(true)
        mutation.mutate(body)
    }


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
                                    <GetFile id={data?.data.logo_id} defImg={defLogo} />
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
                                <Direction
                                    setModal={setModal}
                                    data={direction}
                                    loading={isLoadingDirection}
                                    setSelectedItem={setSelectedItem}
                                />
                                <Gallery data={gallery} loading={isLoadingGallery} />
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
                    <h3 className="title">Boshlang’ich ta’lim</h3>
                </div>
                <ul className="list row">
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={langIcon} alt="icon"/>
                            <span className='txt'>Ta’lim tili</span>
                        </div>
                        <div className='item__title d-flex'>
                            {
                                selectedItem?.edu_langs?.map((i, index) => (
                                    <span key={index}>{i.name}</span>
                                ))
                            }
                        </div>
                    </li>
                    <li className='item'>
                        <div className='row align-center'>
                            <img className='item__img' src={eduIcon} alt="icon"/>
                            <span className='txt'>Ta’lim shakli</span>
                        </div>
                        <div className='item__title row'>
                            {
                                selectedItem?.edu_types?.map((i, index) => (
                                    <span key={index}>{i.name}</span>
                                ))
                            }
                        </div>
                    </li>

                    {
                        selectedItem?.edu_types?.map((i, index) => (
                            <React.Fragment key={index}>
                                <li className='item'>
                                    <div className='row align-center'>
                                        <img className='item__img' src={conIcon} alt="icon"/>
                                        <span className='txt'>{i.name}</span>
                                    </div>
                                    <span className='item__title'>{formatPrice(i.contract_price)} so’mdan boshlab</span>
                                </li>

                                <li className='item'>
                                    <div className='row align-center'>
                                        <img className='item__img' src={teacherIcon} alt="icon"/>
                                        <span className='txt'>{i.name}</span>
                                    </div>
                                    <span className='item__title'>{i.year} yil</span>
                                </li>
                            </React.Fragment>
                        ))
                    }
                </ul>
                <div className="titles">
                    <span className='title'>Yo'nalish haqida</span>
                    <p className="desc">{ selectedItem?.desc }</p>
                </div>
                <div className='btns'>
                    <button className='btn' onClick={() => setModal2(true)}>Hujjat topshirish</button>
                </div>
            </Drawer>

            <div className='modals'>
                <Modal
                    rootClassName='apply-card-modal'
                    centered={true}
                    footer={false}
                    open={modal2}
                    layout="vertical"
                    onCancel={() => setModal2(false)}
                >
                    <div className="titles">
                        <div className="imgs">
                            <GetFile id={data?.data?.logo_id} defImg={defLogo} />
                        </div>
                        <p className="name">{ data?.data?.name }</p>
                        <p className="desc">{ selectedItem?.name }</p>
                    </div>
                    <Form
                        rootClassName='apply-card-form'
                        initialValues={{remember: true}}
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Ta’lim turi"
                            name="type"
                            rules={[{required: true}]}
                        >
                            <Select
                                size='large'
                                suffixIcon={<CaretDownOutlined/>}
                                placeholder="Talim turi"
                                options={selectedItem?.edu_types?.map(i => ({
                                    value: i?.id,
                                    label: i?.name
                                }))}
                                onChange={(id) => {
                                    const selected = selectedItem?.edu_types?.find(item => item.id === id)
                                    setPrice(selected?.contract_price || 0)
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ta’lim tili"
                            name="language"
                            rules={[{required: true}]}
                        >
                            <Select
                                size='large'
                                suffixIcon={<CaretDownOutlined/>}
                                placeholder="Talim tili"
                                options={selectedItem?.edu_langs?.map(i => ({
                                    value: i?.id,
                                    label: i?.name
                                }))}
                            />
                        </Form.Item>

                        <Form.Item
                            className='padding'
                            label="Diplom, shahodatnoma yoki ma’lumotnoma nusxasi"
                            name="docs"
                            rules={[{required: true}]}
                        >
                            <Upload {...uploadProps} onChange={(e) => setFile1(e.file.percent)}>
                                <Input
                                    rootClassName={file1 !== null && 'change-icon'}
                                    size='large'
                                    suffix={<UploadIcon/>}
                                    prefix={file1 !== null ? file1?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="3x4 rasm"
                            name="image"
                            rules={[{required: true}]}
                        >
                            <Upload {...uploadProps} onChange={(e) => setFile2(e.file.percent)}>
                                <Input
                                    rootClassName={file2 !== null && 'change-icon'}
                                    size='large'
                                    suffix={<UploadIcon/>}
                                    prefix={file2 !== null ? file2?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                        </Form.Item>
                        <p className='price'>
                            {
                                price ? formatPrice(price || 0) + ' UZS'
                                    : 'Talim turini tanlang!'
                            }
                        </p>
                        <Button
                            className='btn'
                            loading={loading}
                            type="submit"
                            htmlType='submit'
                        >
                            Hujjat topshirish
                        </Button>
                    </Form>
                </Modal>
                <Modal
                    rootClassName='apply-card-modal-success'
                    closeIcon={false}
                    centered={true}
                    footer={false}
                    open={modalSuccess}
                    // onOk={handleOk}
                    onCancel={() => setModalSuccess(false)}
                >
                    <div className="titles">
                        <img className='img' src={successIcon} alt="icon"/>
                        <p className="txt">Tabriklaymiz!</p>
                        <p className="name">{userData?.first_name} {userData?.last_name}</p>
                        <p className="desc">Siz {data?.university?.name}ga muvaffaqiyatli hujjat
                            topshirdingiz!</p>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UniversityId;