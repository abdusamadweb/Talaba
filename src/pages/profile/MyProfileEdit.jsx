import React, {useEffect, useState} from 'react';
import arrow from "../../assets/images/arrow-icon-white.svg";
import profile from '../../assets/images/user-img.svg'
import camera from '../../assets/images/camera.svg'
import {useNavigate} from "react-router";
import GetFile from "../../components/get-file/GetFile.jsx";
import {Button, Form, Input, Upload} from "antd";
import toast from "react-hot-toast";
import {API_TEST} from "../../api/apiConfig.js";
import {IMaskInput} from "react-imask";
import {useMutation} from "@tanstack/react-query";
import {$resp} from "../../api/apiResp.js";


function UploadIcon() {
    return null;
}

// upload
const props = {
    name: 'file',
    action: API_TEST + '/upload-file',
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

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const userData = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (userData) {
            form.setFieldsValue(userData)
        }
    }, [userData])


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
            birth_date: new Date(values.birth_date).getTime(),
            diploma_file_id: typeof values?.diploma_file_id !== "number" ? values?.diploma_file_id?.fileList[0].response.files[0].id : values?.diploma_file_id,
            passport_file_id: typeof values?.passport_file_id !== "number" ? values?.passport_file_id?.fileList[0].response.files[0].id : values?.passport_file_id,
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
                            <GetFile className='img' id={72} defImg={profile} />
                            <Upload className='camera-upload' {...props}>
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
                                onChange={(e) => setFile1(e.file.percent)}
                                listType="picture"
                            >
                                <Input
                                    rootClassName={file1 !== null && 'change-icon'}
                                    size='large'
                                    suffix={<UploadIcon />}
                                    prefix={file1 !== null ? file1?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            className='form-inp docs'
                            label="Passport yoki ID karta nusxasi"
                            name="passport_file_id"
                        >
                            <Upload
                                {...props}
                                onChange={(e) => setFile2(e.file.percent)}
                                listType="picture"
                            >
                                <Input
                                    rootClassName={file2 !== null && 'change-icon'}
                                    size='large'
                                    suffix={<UploadIcon />}
                                    prefix={file2 !== null ? file2?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                            <Button
                                className={`btn mt1 ${mutation.isPending ? 'load' : ''}`}
                                loading={mutation.isPending}
                                size='large'
                                htmlType="submit"
                            >
                                Saqlash
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default MyProfileEdit;