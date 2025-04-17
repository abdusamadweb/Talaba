import './style.scss'
import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, DatePicker, Form, Input, Modal, Tabs, Upload} from "antd";
import {formatPhone, formatPrice, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../../api/apiResp.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {useParams} from "react-router-dom";
import {fields} from "./formFields.js";
import GetFile from "../../../components/get-file/GetFile.jsx";
import GetFileDef from "../../../components/get-file/GetFileDef.jsx";
import AdminDirGroup from "./tabs/AdminDirGroup.jsx";
import AdminGallery from "./tabs/AdminGallery.jsx";
import AdminDir from "./tabs/AdminDir.jsx";
import toast from "react-hot-toast";

const { RangePicker } = DatePicker
const { TextArea } = Input


const AdminUniId = () => {

    const { id } = useParams()

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file, setFile] = useState(null)
    const [data1, setData1] = useState()


    // fetch
    const fetchData = async () => {
        const { data } = await $adminResp.get(`/university/get/${id}`)
        return data
    }
    const { data: uni, refetch } = useQuery({
        queryKey: ['university-id', id],
        queryFn: fetchData,
        keepPreviousData: true,
    })
    const data = uni?.data


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('university', {
        refetch,
        form,
        setModal,
        setSelectedItem,
        addOrEdit,
        deleteData
    })

    const onFormSubmit = (values) => {
        const { dates, ...rest } = values
        const body = {
            ...rest,
            status: values.status ? 'active' : 'inactive',
            application_start: dates ? dates?.[0]?.valueOf() : new Date(selectedItem?.application_start).getTime(),
            application_end: dates ? dates?.[1]?.valueOf() : new Date(selectedItem?.application_end).getTime(),
        }

        addOrEditMutation.mutate({
            values: body,
            selectedItem
        })
    }

    const deleteItem = (id) => {
        deleteMutation.mutate(id)
    }


    // form
    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem)
        } else {
            form.resetFields()
        }
    }, [form, selectedItem])


    // tab items
    const items = [
        {
            key: '1',
            label: 'Talim turi',
            children: <AdminDirGroup id={id} />,
        },
        {
            key: '2',
            label: 'Talim yonalishi',
            children: <AdminDir id={id} />,
        },
        {
            key: '3',
            label: 'Arizalar',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Galereya',
            children: <AdminGallery id={id} />,
        },
    ]


    // img upload
    const onLogoChange = (info) => {
        if (info.file.status === 'uploading') return;

        if (info.file.status === 'done') {
            const newLogoId = info.file.response?.files?.[0]?.id;

            if (newLogoId) {
                setData1(prev => ({ ...prev, logo_id: newLogoId }));
                toast.success('Logo yangilandi ✅');
            } else {
                toast.error('Fayl ID topilmadi ❌');
            }

            setFile(null); // сбрасываем загрузку
        } else if (info.file.status === 'error') {
            toast.error('Yuklashda xatolik ❌');
        }
    };



    return (
        <div className="admin-uni other page">
            <div className="container">
                <Title
                    title={data?.name}
                    setModal={setModal}
                    additional={<Actions
                        setModal={setModal}
                        setSelectedItem={setSelectedItem}
                        deleteItem={deleteItem}
                        i={data}
                    />}
                    navigate
                    btn
                />
                <div className="content">
                    <div className="content__head">
                        <div className="titles row align-center">
                            <div className="imgs">
                                <GetFile className='img' id={data?.logo_id} />
                                <button className='btn'>
                                    <i className="fa-regular fa-pen-to-square"/>
                                    <Upload {...uploadProps} onChange={onLogoChange}>
                                        <Input />
                                    </Upload>
                                </button>
                            </div>
                            <div>
                                <h3 className="title">{ data?.name }</h3>
                                <span className='txt'>{ data?.address }</span>
                            </div>
                        </div>
                        <div className="labels">
                            <div className='item'>
                                <span className='title'>Qoshilgan sanasi:</span>
                                <span className='txt'>{ new Date(data?.created_at).toLocaleDateString() }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Ozgartirilgan sanasi:</span>
                                <span className='txt'>{ new Date(data?.updated_at).toLocaleDateString() }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Ariza boshlanishi:</span>
                                <span className='txt'>{ new Date(data?.application_start).toLocaleDateString() }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Ariza tugashi:</span>
                                <span className='txt'>{ new Date(data?.application_end).toLocaleDateString() }</span>
                            </div>

                            <div className='item'>
                                <span className='title'>Telefon raqam:</span>
                                <span className='txt'>{ data ? formatPhone(data?.phone_number) : 0 }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Email:</span>
                                <span className='txt'>{ data?.email }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Sayt:</span>
                                <span className='txt'>{ data?.site }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Region:</span>
                                <span className='txt'>{ data?.region.name }</span>
                            </div>

                            <div className='item'>
                                <span className='title'>Latitude:</span>
                                <span className='txt'>{ data?.latitude }</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Longitude:</span>
                                <span className='txt'>{ data?.longitude }</span>
                            </div>
                        </div>
                        <div className='descs'>
                            <div className='item'>
                                <span className='title'>Tavsif:</span>
                                <span className='txt'>{data?.desc}</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Grandlar:</span>
                                <span className='txt'>{data?.grands}</span>
                            </div>
                            <div className="imgs item">
                                <span className='title'>Rasmi:</span>
                                <GetFileDef className='img' id={data?.photo_id}/>
                                <button className='btn'>
                                    <i className="fa-regular fa-pen-to-square"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content__body">
                        <Tabs
                            rootClassName='no-copy'
                            defaultActiveKey="1"
                            items={items}
                            size='large'
                        />
                    </div>
                </div>
            </div>
            <Modal
                rootClassName='admin-modal'
                className='main-modal'
                title={modal === 'add' ? "Qoshish" : "Ozgartirish"}
                open={modal !== 'close'}
                onCancel={() => {
                    setModal('close')
                    setSelectedItem(null)
                }}
            >
                <Form
                    onFinish={onFormSubmit}
                    layout='vertical'
                    validateMessages={validateMessages}
                    form={form}
                >
                    {fields.map((item) => (
                        <Form.Item
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[{ required: item.required }]}
                        >
                            <Input
                                placeholder={item.placeholder}
                                type={item.type}
                            />
                        </Form.Item>
                    ))}

                    <Form.Item name='desc' label='Tavsif' rules={[{ required: true }]}>
                        <TextArea rows={3} placeholder='Tavsif' />
                    </Form.Item>
                    <Form.Item name='grands' label='Grandlar' rules={[{ required: true }]}>
                        <TextArea rows={3} placeholder='Grandlar' />
                    </Form.Item>

                    <Form.Item
                        name='dates'
                        rules={[{ required: !selectedItem }]}
                        label={`Ariza sanasi:
                         ${new Date(selectedItem?.application_start).toLocaleDateString()}
                         ~ ${new Date(selectedItem?.application_end).toLocaleDateString()}`}
                    >
                        <RangePicker size='large' />
                    </Form.Item>

                    <Form.Item
                        name='status'
                        valuePropName="checked"
                    >
                        <Checkbox className='no-copy'>Status</Checkbox>
                    </Form.Item>

                    <div className='end mt1'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size='large'
                            loading={addOrEditMutation?.isPending}
                        >
                            Tasdiqlash
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUniId