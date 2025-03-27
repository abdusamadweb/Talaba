import React, {useEffect, useState} from 'react'
import './Login.scss'
import logo from '../../assets/images/big-logo.svg'
import back from '../../assets/images/auth-arrow.svg'
import {Button, Form, Input} from "antd"
import {useMutation} from "@tanstack/react-query"
import $api from "../../api/apiConfig.js"
import toast from "react-hot-toast"
import {formatPhone} from "../../assets/scripts/global.js"
import {miniApp} from "@telegram-apps/sdk";

const uz =
    <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="29" height="20" fill="url(#pattern0_912_3031)"/>
        <defs>
            <pattern id="pattern0_912_3031" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_912_3031" transform="matrix(0.00195312 0 0 0.00283203 0 -0.225)"/>
            </pattern>
            <image id="image0_912_3031" width="512" height="512" preserveAspectRatio="none"
                   xlinkHref="data:image/png;base64,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"/>
        </defs>
    </svg>


// fetch
const sendPhoneAuth = async (phone) => {
    const {data} = await $api.post("/auth/auth-phone", {phone_number: phone, chat_id: miniApp.initDataUnsafe?.chat?.id || null})
    return data
}
const checkSmsAuth = async ({sms_id, code}) => {
    const {data} = await $api.post("/auth/check-sms-code", {sms_id, code})
    return data
}


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
        mutation.mutate(values.phoneNumber)
    }

    const mutationSms = useMutation({
        mutationFn: checkSmsAuth,
        onSuccess: (res) => {
            toast.success(res.message)

            localStorage.setItem('token', res?.token)
            localStorage.setItem('user', JSON.stringify(res?.user))
            localStorage.setItem('user-state', res?.user.state)

            window.location.href = '/'
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
                    <div>chat_id: {miniApp.initDataUnsafe?.chat?.id}</div>
                    <div>{!miniApp.isExpanded.isAvailable() ? 'TG emas' : 'TG'}</div>
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
                                    name="phoneNumber"
                                >
                                    <Input
                                        size="large"
                                        prefix={uz}
                                        placeholder='+998 -- --- -- --'
                                        type='tel'
                                    />
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
                                            type='number'
                                            size='large'
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