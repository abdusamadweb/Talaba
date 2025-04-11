import React, {useEffect, useState} from 'react'
import './Login.scss'
import logo from '../../assets/images/big-logo.svg'
import back from '../../assets/images/auth-arrow.svg'
import {Button, Form, Input} from "antd"
import {useMutation} from "@tanstack/react-query"
import $api from "../../api/apiConfig.js"
import toast from "react-hot-toast"
import {formatPhone} from "../../assets/scripts/global.js"
import {IMaskInput} from "react-imask";


const chatId =
    window.Telegram?.WebApp?.initDataUnsafe?.user?.id ||
    new URLSearchParams(window.location.search).get("chat_id") ||
    5015938026

// fetch
const sendPhoneAuth = async (phone) => {
    const {data} = await $api.post("/auth/auth-phone", {phone_number: phone, chat_id: chatId})
    return data
}
const checkSmsAuth = async ({sms_id, code}) => {
    const {data} = await $api.post("/auth/check-sms-code", {sms_id, code})
    return data
}


const PhoneInput = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <IMaskInput
            type="tel"
            mask="+998 00 000 00 00"
            lazy={false} // Показывает маску сразу
            placeholder="-"
            unmask={true} // Передает "чистый" номер в Form
            value={value} // Связывает с Form
            onAccept={onChange} // Передает изменения в Form
            inputRef={ref} // Ant Design ожидает, что ref будет передан в Input
        />
    );
});


const Login = () => {

    const [form] = Form.useForm()

    const [nav, setNav] = useState(0)
    const [sms, setSms] = useState(null)

    // sms timer
    const [active, setActive] = useState(false)
    const [timeLeft, setTimeLeft] = useState(120)

    const mutation = useMutation({
        mutationFn: sendPhoneAuth,
        onSuccess: (res) => {
            toast.success(res.message)

            setNav(1)
            setSms(res.data)

            startTimer()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFinish = (values) => {
        mutation.mutate("+998" + values.phoneNumber)
    }

    const mutationSms = useMutation({
        mutationFn: checkSmsAuth,
        onSuccess: (res) => {
            toast.success(res.message)

            localStorage.setItem('token', res?.token)
            localStorage.setItem('user', JSON.stringify(res?.user))
            localStorage.setItem('user-state', res?.user.state)

            window.location.href = '/'
            form.resetFields()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFinishSms = (values) => {
        console.log(values)
        mutationSms.mutate({sms_id: sms.sms_id, code: values.code})
    }


    // timer
    useEffect(() => {
        if (!active) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setActive(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [active])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
    }

    function startTimer() {
        setTimeLeft(120)
        setActive(true)
    }

    const retryOnFinish = () => {
        mutation.mutate(sms.phone_number)
    }


    return (
        <div className='login'>
            <div className="container">
                <div className="login__content relative">
                    {
                        nav !== 0 ? <button className='back' onClick={() => setNav((prev) => prev - 1)}>
                            <img src={back} alt="icon"/>
                        </button> : <></>
                    }
                    <div className='login__imgs'>
                        <img src={logo} alt="logo"/>
                    </div>
                    {
                        nav === 0 ?
                            <div className="login__titles">
                                <h2 className="title">Telefon raqamingizni kiriting!</h2>
                                <p className="desc">O’zingiz ishlatadigan telefon raqamingiz!</p>
                            </div>
                            :
                            <div className="login__titles">
                                <h2 className="title">SMS kodini tasdiqlang!</h2>
                                <p className="desc">{formatPhone(sms.phone_number) || '000'} ga SMS yuborlidi.</p>
                            </div>
                    }
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={nav === 0 ? onFinish : onFinishSms}
                    >
                        {
                            nav === 0 ?
                                <Form.Item
                                    className='imask'
                                    name="phoneNumber"
                                    rules={[{ required: true, message: "" }]}
                                    initialValue="+998 "
                                >
                                    <PhoneInput />
                                    {/*<Input*/}
                                    {/*    size="large"*/}
                                    {/*    prefix={uz}*/}
                                    {/*    ref={inputRef}*/}
                                    {/*    type="tel"*/}
                                    {/*    defaultValue="+998 "*/}
                                    {/*/>*/}
                                </Form.Item>
                                :
                                <>
                                    <Form.Item
                                        className='otp'
                                        name="code"
                                        rules={[{required: true, message: ""}]}
                                    >
                                        <Input.OTP
                                            length={4}
                                            type='tel'
                                            size='large'
                                            onPaste={(e) => e.preventDefault()}
                                            onCopy={(e) => e.preventDefault()}
                                            onCut={(e) => e.preventDefault()}
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    </Form.Item>
                                    <div className='sms-retry'>
                                        <p className='txt'>SMS ni qayta yuborish</p>
                                        {
                                            active ? <span className='sms-btn'>{formatTime(timeLeft)}</span>
                                                :
                                                <button className='sms-btn' onClick={retryOnFinish} type='button'>Qayta
                                                    yuborish</button>
                                        }
                                    </div>
                                </>
                        }
                        <Button
                            className={`btn ${mutation.isPending || mutationSms.isPending ? 'load' : ''}`}
                            loading={mutation.isPending || mutationSms.isPending}
                            size='large'
                            htmlType="submit"
                        >
                            Tizimga kirish
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login