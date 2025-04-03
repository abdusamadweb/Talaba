import React, {useState} from 'react';
import './ApplyCard.scss'
import langIcon from '../../../assets/images/language-icon.svg'
import eduIcon from '../../../assets/images/book-icon.svg'
import conIcon from '../../../assets/images/dollar-icon.svg'
import successIcon from '../../../assets/images/apply-success.svg'
import {Link} from "react-router-dom"
import {formatPrice} from "../../../assets/scripts/global.js";
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import {API_TEST} from "../../../api/apiConfig.js";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../../api/apiResp.js";
import GetFile from "../../get-file/GetFile.jsx";
import GetFileDef from "../../get-file/GetFileDef.jsx";

const Option = ({ txt }) => {
    return (
        <div className='option-wrapper'>
            <span>{ txt }</span>
            <div className='circle'>
                <span className='dot' />
            </div>
        </div>
    )
}

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

const ApplyCard = ({ i, ad }) => {

    const [modal, setModal] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const userData = JSON.stringify('user')


    // form finish
    const mutation = useMutation({
        mutationFn: createApplication,
        onSuccess: () => {
            toast.success('Ariza yuborildi!')
            form.resetFields() // Очищаем форму после успешной отправки

            setFile1(null)
            setFile2(null)

            setModalSuccess(true)
            setModal(false)
            setLoading(false)
        },
        onError: (error) => {
            toast.error(`Xato: ${error.message}`)
            setLoading(false)
        }
    })

    const onFinish = (items) => {
        const body = {
            edu_direction_id: i.id,
            edu_lang_id: items.language,
            edu_type: items.type,
            diploma_id: items.docs.file.response?.files[0].id,
            photo_id: items.image.file.response?.files[0].id
        }

        setLoading(true)
        mutation.mutate(body)
    }


    return (
        !ad ?
            <li className='apply-card'>
                <div className="apply-card__head">
                    <GetFileDef className='bg-img' id={72} odiy />
                    <div className='index'>
                        <h3 className="title">{i.university.name}</h3>
                        <div className='img'>
                            <GetFile id={i.university.logo_id} />
                        </div>
                    </div>
                    <div className='overlay'/>
                </div>
                <div className="apply-card__body">
                    <div className="mb1">
                        <div className='item it'>
                            <div className='row align-center'>
                                <img className='item__img' src={conIcon} alt="icon"/>
                                <span className='txt'>Ta’lim yo’nalishi</span>
                            </div>
                            <span className='item__title'>{i.name}</span>
                        </div>
                        <ul className="list">
                            <li className='item'>
                                <div className='row align-center'>
                                    <img className='item__img' src={langIcon} alt="icon"/>
                                    <span className='txt'>Ta’lim tili</span>
                                </div>
                                <div className='item__title row'>
                                    {
                                        i?.edu_langs?.map((i, index) => (
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
                                <span className='item__title'>{i.edu_direction_group.name}</span>
                            </li>
                        </ul>
                        <div className='item'>
                            <div className='row align-center'>
                                <img className='item__img' src={conIcon} alt="icon"/>
                                <span className='txt'>Kontrakt to’lovi</span>
                            </div>
                            <div className='item__title row'>
                            </div>
                            <span className='item__title'>{formatPrice(i?.edu_types?.[0]?.contract_price || 0)} so’mdan boshlab</span>
                        </div>
                    </div>
                    <div className="btns align-center">
                        <Link className='btn btn1' to={`/university/${i.university.id}`}>Batafsil</Link>
                        <button className={`btn btn2 ${i.status !== 'active' ? 'btn2-red' : ''} `}
                                onClick={() => setModal(true)}>
                            {!i.status !== 'active' ? 'Hujjat topshirish' : 'Qabul yopilgan'}
                        </button>
                    </div>
                </div>
                <Modal
                    rootClassName='apply-card-modal'
                    centered={true}
                    footer={false}
                    open={modal}
                    layout="vertical"
                    // onOk={handleOk}
                    onCancel={() => setModal(false)}
                >
                    <div className="titles">
                        <div className="imgs">
                            <GetFile id={i.university.logo_id} />
                        </div>
                        <p className="name">{ i.university.name }</p>
                        <p className="desc">{ i.main_direction.name }</p>
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
                                options={i.edu_type?.map(i => ({
                                    value: i,
                                    label: <Option txt={i}/>
                                }))}
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
                                options={i.edu_langs?.map(i => ({
                                    value: i.id,
                                    label: <Option txt={i.name}/>
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
                                    suffix={<UploadIcon />}
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
                                    suffix={<UploadIcon />}
                                    prefix={file2 !== null ? file2?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                        </Form.Item>

                        <p className='price'> {formatPrice(i.contract_price || 0)} UZS</p>
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
                        <p className="txt">Tabriklaymiz</p>
                        <p className="name">{userData?.first_name} {userData?.last_name}</p>
                        <p className="desc">Siz {i.university.name}ga muvaffaqiyatli hujjat
                            topshirdingiz!</p>
                    </div>
                </Modal>
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