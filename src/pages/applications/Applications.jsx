import React, {useState} from 'react';
import './Applications.scss'
import img404 from '../../assets/images/applications404-icon.svg'
import {formatPhone, formatPrice} from "../../assets/scripts/global.js";
import {Button, Modal, Skeleton, Steps} from "antd";
import {useMutation, useQuery} from "@tanstack/react-query";
import {$resp} from "../../api/apiResp.js";
import {Link} from "react-router-dom"
import toast from "react-hot-toast";
import GetFile from "../../components/get-file/GetFile.jsx";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";

const app404 = <div className="d404">
            <div className="wrapper">
                <img className="d404__img" src={img404} alt="icon"/>
                <div className='d404__titles'>
                    <p className="title">Arizalar mavjud emas</p>
                    <p className="desc">Siz hali hech qanday arizalar mavjud emas</p>
                </div>
                <Link className='d404__btn' to='/search'>Hujjat topshirish</Link>
            </div>
        </div>

const fetchApps = async () => {
    const { data } = await $resp.get('/application/my')
    return data
}
const rejectApplication = async (id) => {
    const { data } = await $resp.put(`/application/reject/${id}`)
    return data
}

const Applications = () => {

    const [modal, setModal] = useState(false)
    const [sItem, setSItem] = useState({})
    const [cancelLoad, setCancelLoad] = useState(false)


    // Fetch regions
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: fetchApps
    })

    // reject application
    const mutation = useMutation({
        mutationFn: rejectApplication,
        onSuccess: () => {
            toast.success("Bekor qilindi!")
            setCancelLoad(false)
            setModal(false)
            refetch()
        },
        onError: () => {
            toast.error("Xato!")
            setCancelLoad(false)
            refetch()
        }
    })

    const handleReject = (id) => {
        setCancelLoad(true)
        mutation.mutate(id)
    }


    return (
        <div className='applications page'>
            <div className="container">
                {
                    isLoading ? <div className='p1 pb3'>
                            <Skeleton active /> <br/>
                            <Skeleton active /> <br/>
                            <Skeleton active />
                        </div>
                        :
                        data?.data.length ?
                            <ul className="applications__list">
                                {
                                    data?.data?.map((i, index) => (
                                        <li className='apply-card' key={index}>
                                            <div className="apply-card__head">
                                                <div className="bg-img bg-img2">
                                                    <GetFileDef id={i.face_photo_id} odiy />
                                                </div>
                                                <div className='index'>
                                                    <h3 className="title">{i.university.name}</h3>
                                                    <span className='name'>{i.edu_direction_name}</span>
                                                    <div className='img'>
                                                        <GetFile id={i.university.logo_id}/>
                                                    </div>
                                                </div>
                                                <div className='overlay'/>
                                            </div>
                                            <div className="apply-card__body">
                                            <div className="mb1">
                                                    <ul className="list">
                                                        <li className='item'>
                                                            <span className='txt'>Tel raqam</span>
                                                            <span className='item__title'>{ formatPhone(i.university.phone_number) }</span>
                                                        </li>
                                                        <li className='item'>
                                                            <span className='txt'>Ta’lim tili</span>
                                                            <span className='item__title'>{i.edu_lang.name}</span>
                                                        </li>
                                                        <li className='item'>
                                                            <span className='txt'>Ta’lim shakli</span>
                                                            <span className='item__title'>{i.edu_type}</span>
                                                        </li>
                                                        <li className='item'>
                                                            <span className='txt'>Kontrakt to’lovi</span>
                                                            <span className='item__title'>{formatPrice(i.edu_direction.contract_price)} UZS</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="status">
                                                    <Steps
                                                        size="small"
                                                        type="inline"
                                                        responsive={false}
                                                        current={+i.status_order-1}
                                                        items={[{title: '',}, {title: '',}, {title: ''},{title: ''}, {title: ''},]}
                                                    />
                                                    <p className="status__title">
                                                        Holati:
                                                        <span>{i.status}</span>
                                                    </p>
                                                </div>
                                                {
                                                    i?.status !== 'Bekor qilindi' &&
                                                        <button
                                                            className='btn btn2-red'
                                                            onClick={() => {
                                                                setModal(true)
                                                                setSItem(i)
                                                            }}
                                                        >
                                                            Arizani bekor qilish
                                                        </button>
                                                }
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            : app404
                }
            </div>
            <Modal
                rootClassName='cancel-modal'
                open={modal}
                centered
                footer={false}
                onCancel={() => setModal(false)}
            >
                <p className="title">Arizani bekor qilish</p>
                <p className="desc">Sizning arizangiz universitet
                    ma’lumotlar bazasidan o’chiriladi.</p>
                <div className="btns">
                    <button className='btn' onClick={() => setModal(false)}>Yoq</button>
                    <Button
                        className="btn red"
                        size="large"
                        loading={cancelLoad}
                        onClick={() => handleReject(sItem.id)}
                    >
                        Ha
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Applications;