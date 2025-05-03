import React, {useState} from 'react'
import './Login.scss'
import logo from '../../assets/images/big-logo.svg'
import {Button, Form, Input, Upload} from "antd"
import {useMutation} from "@tanstack/react-query";
import {API_TEST} from "../../api/apiConfig.js";
import toast from "react-hot-toast";
import {IMaskInput} from "react-imask";
import back from "../../assets/images/auth-arrow.svg";
import {useSearchParams} from "react-router-dom";
import {$resp} from "../../api/apiResp.js";
import IMask from "imask";
import {uploadProps} from "../../assets/scripts/global.js";

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


// fetch
const sendPhoneAuth = async (body) => {
    const { data } = await $resp.post("/update-profile", body)
    return data
}


// inputs
const PassportInput = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <IMaskInput
            mask="aa 0000000" // Две буквы и 7 цифр
            definitions={{
                a: /[a-zA-Z]/, // Разрешаем и строчные, и заглавные буквы
                0: /[0-9]/, // Только цифры
            }}
            lazy={false} // Показывает маску сразу
            unmask={true} // Передает "чистое" значение в Form
            value={value}
            onAccept={(val) => onChange(val.toUpperCase())}
            inputRef={ref}
        />
    );
});

const BirthDateInput = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <IMaskInput
            type='tel'
            mask="0000-00-00" // Формат YYYY-MM-DD
            blocks={{
                0: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 9,
                },
            }}
            lazy={false} // Показывает маску сразу
            placeholder="yyyy-mm-dd"
            unmask={false}
            value={value}
            onAccept={onChange} // Обновляет значение в Form
            inputRef={ref}
        />
    );
});


const Login2 = () => {

    const [searchParams] = useSearchParams()
    const phone = searchParams.get('phone')?.slice(1)

    const [form] = Form.useForm()
    const [nav, setNav] = useState(0)
    const [loading, setLoading] = useState(false)

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const mutation = useMutation({
        mutationFn: sendPhoneAuth,
        onSuccess: (res) => {
            toast.success(res.message)

            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('user-state', res.data.state)

            window.location.href = '/'
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFinish = (values) => {
        const body = {
            ...values,
            birth_date: new Date(values.birth_date).getTime(),
            phone_number: '+' + phone,
            diploma_file_id: values?.diploma_file_id?.fileList[0].response.files[0].id,
            passport_file_id: values?.passport_file_id?.fileList[0].response.files[0].id
        }
        mutation.mutate(body)
    }

    const onFinishPrev = () => {
        setLoading(true)
        setTimeout(() => {
            setNav(1)
            setLoading(false)
        }, 1000)
    }


    // back to login
    const backToLogin = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('user-state')

        window.location.href = '/login'
    }


    return (
        <div className='login login2'>
            <div className="container">
                <div className="login__content relative">
                    {
                        nav === 0 ? <button className='back' onClick={backToLogin}>
                                <img src={back} alt="icon"/>
                            </button>
                            : <button className='back' onClick={() => setNav(0)}>
                                <img src={back} alt="icon"/>
                            </button>
                    }
                    <div className='login__imgs'>
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="login__titles">
                        <h2 className="title">Identifikatsiyalash!</h2>
                    </div>
                    <Form
                        rootClassName='form'
                        layout='vertical'
                        form={form}
                        onFinish={nav === 0 ? onFinishPrev : onFinish}
                    >
                        <div className={nav === 1 ? 'hide' : ''}>
                            <Form.Item
                                className='form-inp'
                                name="passport_code"
                                label='Passport yoki ID karta seriya raqami'
                                rules={[{required: true, message: "Iltimos to'ldiring!"}]}
                            >
                                <PassportInput />
                                {/*<IMaskInput*/}
                                {/*    mask="AA 0000000"*/}
                                {/*    definitions={{*/}
                                {/*        A: /[A-Z]/, // Только заглавные буквы*/}
                                {/*        0: /\d/,     // Только цифры*/}
                                {/*    }}*/}
                                {/*    placeholder="-- -------"*/}
                                {/*/>*/}
                            </Form.Item>
                            <Form.Item
                                className='form-inp'
                                name="birth_date"
                                label='Tug’ulgan kun (2007-01-30)'
                                rules={[{required: true, message: "Iltimos to'ldiring!"}]}
                            >
                                <BirthDateInput />
                            </Form.Item>
                        </div>
                        <div className={nav === 0 ? 'hide' : ''}>
                            <Form.Item
                                className='form-inp'
                                name="first_name"
                                label='Ism'
                                rules={[{ required: nav, message: "Iltimos to'ldiring!" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder='Ism'
                                    type='text'
                                />
                            </Form.Item>
                            <Form.Item
                                className='form-inp'
                                name="last_name"
                                label='Familiya'
                                rules={[{ required: nav, message: "Iltimos to'ldiring!" }]}
                            >
                                <Input
                                    size="large"
                                    placeholder='Familiya'
                                    type='text'
                                />
                            </Form.Item>
                            <Form.Item
                                className='form-inp docs'
                                label="Diplom, shahodatnoma nusxasi"
                                name="diploma_file_id"
                            >
                                <Upload {...uploadProps} onChange={(e) => setFile1(e.file.percent)}>
                                    <Input
                                        disabled
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
                                <Upload {...uploadProps} onChange={(e) => setFile2(e.file.percent)}>
                                    <Input
                                        disabled
                                        rootClassName={file2 !== null && 'change-icon'}
                                        size='large'
                                        suffix={<UploadIcon />}
                                        prefix={file2 !== null ? file2?.toFixed(1) + '%' : 'Yuklash'}
                                    />
                                </Upload>
                            </Form.Item>
                        </div>
                        <Button
                            className={`btn mt1 ${mutation.isPending || loading ? 'load' : ''}`}
                            loading={nav === 0 ? loading : mutation.isPending}
                            size='large'
                            htmlType="submit"
                        >
                            Tizimga kirish
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login2;