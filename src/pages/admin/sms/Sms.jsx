import React, {useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {Button, Form, Input, Select, Upload} from "antd";
import {CloudUploadOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {$adminResp} from "../../../api/apiResp.js";
import toast from "react-hot-toast";

const Sms = () => {

    const [form] = Form.useForm()

    const [selType, setSelType] = useState(null)
    const [file, setFile] = useState(null)


    // send
    const sendSms = useMutation({
        mutationFn: (payload) => {
            return $adminResp.post('/telegram-service/send', payload.values)
        },
        onSuccess: () => {
            toast.success('SMS yuborildi!')
        },
        onError: () => {
            toast.error('Xato SMS!')
        }
    })


    const onFormSubmit = (values) => {
        const body = {
            ...values,
            file_id: values?.file_id?.fileList?.[0]?.response?.files[0].id
        }

        sendSms.mutate({
            values: body
        })
    }


    return (
        <div className='sms other page'>
            <div className="container">
                <Title title='Xabar yuborish ~ sms' />
                <div className="content">
                    <Form
                        onFinish={onFormSubmit}
                        layout='vertical'
                        validateMessages={validateMessages}
                        form={form}
                    >
                        <div className="wrapper" style={{maxWidth: '500px'}}>
                            <Form.Item
                                name='type'
                                label='Turi'
                                rules={[{ required: true }]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Talim turi"
                                    onChange={(e) => setSelType(e)}
                                    options={[
                                        {
                                            value: 'text',
                                            label: 'Text'
                                        },
                                        {
                                            value: 'image',
                                            label: 'Rasm'
                                        },
                                        {
                                            value: 'video',
                                            label: 'Video'
                                        },
                                    ]}
                                />
                            </Form.Item>

                            {
                                (selType === 'image' || selType === 'video') &&
                                <Form.Item
                                    className='form-inp docs'
                                    label="Rasmlar ( 5mb dan kam bolgan holda! )"
                                    name="file_id"
                                    rules={[{required: true, message: ''}]}
                                >
                                    <Upload {...uploadProps} maxCount={4} multiple={true} onChange={(e) => setFile(e.file.percent)}>
                                        <Input
                                            rootClassName={`upload-inp ${file !== null && 'change-icon'}`}
                                            size='large'
                                            suffix={<CloudUploadOutlined />}
                                            prefix={file !== null ? file?.toFixed(1) + '%' : 'Yuklash'}
                                        />
                                    </Upload>
                                </Form.Item>
                            }

                            <Form.Item
                                name='caption'
                                label='Xabar'
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea
                                    placeholder='Xabar'
                                    type='text'
                                />
                            </Form.Item>
                            <Form.Item
                                name='buttons'
                                label='Tugmalar'
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder='Tugmalar'
                                    type='text'
                                />
                            </Form.Item>
                            <Form.Item
                                name='chat_id'
                                label='Chat ID (agar berilsa faqat shu userga boradi, berilmasa barchaga ketadi)'
                            >
                                <Input
                                    placeholder='Chat ID'
                                    type='tel'
                                />
                            </Form.Item>
                        </div>

                        <div className='end mt1'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size='large'
                                // loading={addOrEditMutation?.isPending}
                            >
                                Tasdiqlash
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Sms;