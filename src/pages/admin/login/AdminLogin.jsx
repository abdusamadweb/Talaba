import './Login.scss'
import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)


    const auth = ({ login, password }) => {
        setLoading(true)

        if (login === 'admin' && password === '1') {
            localStorage.setItem('admin-token', 1)

            toast.success('Хуш келибсиз!')
            setTimeout(() => navigate('/admin'), 1500)
        } else {
            toast.error('Хато!')
            setLoading(false)
        }
    }


    return (
        <div className="admin-login">
            <div className="admin-login__inner">
                <h2 className="admin-login__title mb2">Кириш</h2>
                <Form
                    name="basic"
                    layout='vertical'
                    onFinish={auth}
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Логинни киритинг!',
                            },
                        ]}
                    >
                        <Input placeholder='Логин' />
                    </Form.Item>
                    <Form.Item
                        label="Парол"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Ппаролни киритинг!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Парол' />
                    </Form.Item>
                    <Button
                        className="login__button"
                        type="primary"
                        htmlType="submit"
                        size='large'
                        loading={loading}
                    >
                        Тасдиклаш
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Auth;