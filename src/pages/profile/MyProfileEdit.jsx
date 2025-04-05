import React, {useEffect, useState} from 'react';
import arrow from "../../assets/images/arrow-icon-white.svg";
import profile from '../../assets/images/user-img.svg'
import camera from '../../assets/images/camera.svg'
import {useNavigate} from "react-router-dom";
import GetFile from "../../components/get-file/GetFile.jsx";
import {Button, Form, Input, Upload} from "antd";
import toast from "react-hot-toast";
import {API_TEST} from "../../api/apiConfig.js";
import {IMaskInput} from "react-imask";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../api/apiResp.js";


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


// upload
const props = {
    name: 'file',
    action: API_TEST + '/upload-file',
    // headers: {
    //     "Content-Type": "multipart/form-data",
    // },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            toast.success(`${info.file.name} yuklandi! ✅`);
        } else if (info.file.status === 'error') {
            toast.error(`${info.file.name} xatolik! ❌`);
        }
    },
}

// fetch
const updateProfile = async (body) => {
    const { data } = await $resp.post("/update-profile", body)
    return data
}

const MyProfileEdit = () => {

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const [photo, setPhoto] = useState(null)
    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const userData = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (userData) {
            form.setFieldsValue(userData)
        }
    }, [])


    // mutate
    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: (res) => {
            toast.success(res.message)

            localStorage.setItem('user', JSON.stringify(res.data))
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFinish = (values) => {
        const body = {
            ...values,
            phone_number: values.phone_number.replace(/\s/g, ''),
            birth_date: new Date(values.birth_date).getTime(),
            diploma_file_id: file1 ? file1?.file.response.files[0].id : values?.diploma_file_id,
            passport_file_id: file2 ? file2?.file.response.files[0].id : values?.passport_file_id,
            ...(photo && { avatar_id: photo?.file.response.files[0].id })
        }
        mutation.mutate(body)
    }


    return (
        <div className="my-profile profile-edit page">
            <div className="container">
                <div className="my-profile__back">
                    <button className="btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="icon"/>
                    </button>
                    <span className="txt">Mening profilim</span>
                </div>
                <div className="profile-edit__content">
                    <div className="imgs row align-center no-wrap">
                        <div className='relative'>
                            <GetFile className='img' id={photo ? photo?.file?.response?.files?.[0]?.id : userData?.avatar_id} defImg={profile} />
                            <Upload
                                className='camera-upload'
                                {...props}
                                onChange={(e) => setPhoto(e)}
                            >
                                <button className='btn'>
                                    <img src={camera} alt="camera"/>
                                </button>
                            </Upload>
                        </div>
                        <div className='txts'>
                            <p className='txt'>Profil rasmini yuklang</p>
                            <p className='desc'>Hajmi 5 mb dan katta bo'lmagan, .png, .jpg, .jpeg formatdagi oq yoki ko’k fonda olingan 3x4 razmerdagi rasmingizni yuklang.</p>
                        </div>
                    </div>
                    <Form
                        rootClassName='form'
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item className='form-inp' label='Ism' name="first_name">
                            <Input
                                size="large"
                                placeholder='Ism'
                            />
                        </Form.Item>
                        <Form.Item className='form-inp' label='Familiya' name="last_name">
                            <Input
                                size="large"
                                placeholder='Familiya'
                            />
                        </Form.Item>
                        <Form.Item
                            className='form-inp'
                            name="birth_date"
                            label='Tug’ulgan kuni'
                        >
                            <IMaskInput
                                mask="0000-00-00"
                                definitions={{ 0: /\d/ }}
                                placeholder="yyyy-oo-kk"
                            />
                        </Form.Item>
                        <Form.Item
                            className='form-inp'
                            name="passport_code"
                            label='Passport yoki ID karta seriya raqami'
                        >
                            <IMaskInput
                                mask="AA 0000000"
                                definitions={{
                                    A: /[A-Z]/, // Только заглавные буквы
                                    0: /\d/,     // Только цифры
                                }}
                                placeholder="-- -------"
                            />
                        </Form.Item>
                        <Form.Item className='form-inp' label='Telefon raqam' name="phone_number">
                            <IMaskInput
                                mask="+998 00 000 00 00" // Динамическая маска
                                placeholder="+998 -- --- -- --"
                                definitions={{0: /\d/}}
                            />
                        </Form.Item>
                        <Form.Item
                            className='form-inp docs'
                            label="Diplom, shahodatnoma nusxasi"
                            name="diploma_file_id"
                        >
                            <Upload
                                {...props}
                                onChange={(e) => setFile1(e)}
                                listType="picture"
                            >
                                <Input
                                    rootClassName={file1?.file.percent !== null && 'change-icon'}
                                    size='large'
                                    disabled
                                    suffix={<UploadIcon />}
                                    prefix={file1 ? file1?.file.percent?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                            <GetFile className='abs-img' id={userData?.diploma_file_id} />
                        </Form.Item>
                        <Form.Item
                            className='form-inp docs'
                            label="Passport yoki ID karta nusxasi"
                            name="passport_file_id"
                        >
                            <Upload
                                {...props}
                                onChange={(e) => setFile2(e)}
                                listType="picture"
                            >
                                <Input
                                    rootClassName={file2?.file.percent !== null && 'change-icon'}
                                    size='large'
                                    disabled
                                    suffix={<UploadIcon />}
                                    prefix={file2 ? file2?.file.percent?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                            <GetFile className='abs-img' id={userData?.passport_file_id} />
                        </Form.Item>
                        <Button
                            className={`btn mt1 ${mutation.isPending ? 'load' : ''}`}
                            loading={mutation.isPending}
                            size='large'
                            htmlType="submit"
                        >
                            Saqlash
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default MyProfileEdit;