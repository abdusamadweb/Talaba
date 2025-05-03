import './style.scss'
import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, DatePicker, Form, Input, Modal, Select, Tabs, Upload} from "antd";
import {formatPhone, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import Actions from "../../../components/admin/table/Actions.jsx";
import {getRequest, useCrud} from "../../../hooks/useCrud.jsx";
import {useParams} from "react-router-dom";
import {fields} from "./formFields.js";
import GetFile from "../../../components/get-file/GetFile.jsx";
import GetFileDef from "../../../components/get-file/GetFileDef.jsx";
import AdminDirGroup from "./tabs/AdminDirGroup.jsx";
import AdminGallery from "./tabs/AdminGallery.jsx";
import AdminDir from "./tabs/AdminDir.jsx";
import {CaretDownOutlined, CloudUploadOutlined} from "@ant-design/icons";
import AdminApps from "./tabs/AdminApps.jsx";
import $api from "../../../api/apiConfig.js";

const { RangePicker } = DatePicker
const { TextArea } = Input


// fetch
const fetchRegions = async () => {
    const { data } = await $api.get('/regions/all')
    return data
}


const AdminUniId = () => {

    const { id } = useParams()

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)



    // fetch
    const fetchData = () => getRequest(`/university/get/${id}`)
    const { data: uni, refetch } = useQuery({
        queryKey: ['university-id', id],
        queryFn: fetchData,
        keepPreviousData: true,
    })
    const data = uni?.data

    const { data: regions } = useQuery({
        queryKey: ['regions'],
        queryFn: fetchRegions,
        keepPreviousData: true,
    })


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
            application_start: dates?.[0]?.valueOf() || selectedItem?.application_start,
            application_end: dates?.[1]?.valueOf() || selectedItem?.application_end,
            logo_id: values.logo_id?.file?.response?.files[0]?.id || selectedItem?.logo_id,
            photo_id: values.photo_id?.file?.response?.files[0]?.id || selectedItem?.photo_id,
        }
        console.log(body)

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
            label: 'Talim darajasi',
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
            children: <AdminApps id={id} />,
        },
        {
            key: '4',
            label: 'Galereya',
            children: <AdminGallery id={id} />,
        },
    ]



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
                                <span className='txt'>{ data?.region?.name }</span>
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
                width={800}
                title={modal === 'add' ? "Qoshish" : "Ozgartirish"}
                open={modal !== 'close'}
                onCancel={() => {
                    setModal('close')
                    setSelectedItem(null)
                }}
            >
                <Form
                    className='main-modal-form'
                    onFinish={onFormSubmit}
                    layout='vertical'
                    validateMessages={validateMessages}
                    form={form}
                >
                    <div className='content'>
                        <div>
                            {fields.map((item) => (
                                <Form.Item
                                    key={item.name}
                                    name={item.name}
                                    label={item.label}
                                    rules={[{required: item.required}]}
                                >
                                    <Input
                                        placeholder={item.placeholder}
                                        type={item.type}
                                    />
                                </Form.Item>
                            ))}
                        </div>

                        <div>
                            <Form.Item
                                className='form-inp docs'
                                label="Logo ( 5mb dan kam bolgan holda! )"
                                name="logo_id"
                            >
                                <Upload {...uploadProps} maxCount={4} multiple={true}
                                        onChange={(e) => setFile1(e.file.percent)}>
                                    <Input
                                        rootClassName={`upload-inp ${file1 !== null && 'change-icon'}`}
                                        size='large'
                                        suffix={<CloudUploadOutlined/>}
                                        prefix={file1 !== null ? file1?.toFixed(1) + '%' : 'Yuklash'}
                                    />
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                className='form-inp docs'
                                label="Rasm ( 5mb dan kam bolgan holda! )"
                                name="photo_id"
                            >
                                <Upload {...uploadProps} maxCount={4} multiple={true}
                                        onChange={(e) => setFile2(e.file.percent)}>
                                    <Input
                                        rootClassName={`upload-inp ${file2 !== null && 'change-icon'}`}
                                        size='large'
                                        suffix={<CloudUploadOutlined/>}
                                        prefix={file2 !== null ? file2?.toFixed(1) + '%' : 'Yuklash'}
                                    />
                                </Upload>
                            </Form.Item>

                            <Form.Item name='region_id' label='Hududni tanlang' rules={[{required: true}]}>
                                <Select
                                    size='large'
                                    suffixIcon={<CaretDownOutlined/>}
                                    placeholder="Hududni tanlang"
                                    options={regions?.regions?.map(i => (
                                        {
                                            value: i.id,
                                            label: i.name
                                        }
                                    ))}
                                />
                            </Form.Item>
                            <Form.Item name='desc' label='Tavsif' rules={[{required: true}]}>
                                <TextArea rows={3} placeholder='Tavsif'/>
                            </Form.Item>
                            <Form.Item name='grands' label='Grandlar' rules={[{required: true}]}>
                                <TextArea rows={3} placeholder='Grandlar'/>
                            </Form.Item>

                            <Form.Item
                                name='dates'
                                rules={[{required: !selectedItem}]}
                                label={`Ariza sanasi:
                         ${new Date(selectedItem?.application_start).toLocaleDateString()}
                         ~ ${new Date(selectedItem?.application_end).toLocaleDateString()}`}
                            >
                                <RangePicker size='large'/>
                            </Form.Item>

                            <Form.Item
                                name='status'
                                valuePropName="checked"
                            >
                                <Checkbox className='no-copy'>Status</Checkbox>
                            </Form.Item>
                        </div>
                    </div>

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