import React, {useState} from 'react';
import './Applications.scss'
import img404 from '../../assets/images/applications404-icon.svg'
import {formatPrice} from "../../assets/scripts/global.js";
import {Button, message, Modal, Steps} from "antd";
import {useMutation, useQuery} from "@tanstack/react-query";
import {$resp} from "../../api/apiResp.js";

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

    const logo = null
    const bgImg = null
    const degree = '-----'


    // toast
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Bekor qilindi !',
        });
    }
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Xato !',
        });
    }


    // Fetch regions
    const { data, refetch } = useQuery({
        queryKey: ['regions'],
        queryFn: fetchApps
    })

    // reject application
    const mutation = useMutation({
        mutationFn: rejectApplication,
        onSuccess: () => {
            success()
            setCancelLoad(false)
            setModal(false)

            refetch()
        },
        onError: () => {
            error()
            setCancelLoad(false)
        }
    })

    const handleReject = (id) => {
        setCancelLoad(true)

        mutation.mutate(id)
    }


    return (
        <div className='applications'>
            <div className="container">
                {contextHolder}
                {
                    data?.data && true ?
                        <ul className="applications__list">
                            {
                                data?.data?.map((i, index) => (
                                    <li className='apply-card' key={index}>
                                        <div className="apply-card__head" style={{backgroundImage: `url(${bgImg})`}}>
                                            <div className='index'>
                                                <h3 className="title">{i.university.name}</h3>
                                                <span className='name'>{i.edu_direction_name}</span>
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
                                            <button className='btn btn2-red' onClick={() => {
                                                setModal(true)
                                                setSItem(i)
                                            }}>Arizani bekor qilish</button>
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
                <div className="imgs grid-center">
                    <img src={logo} alt="logo"/>
                </div>
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