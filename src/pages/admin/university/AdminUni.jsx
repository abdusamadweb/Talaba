import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, DatePicker, Form, Input, Modal, Select, Table, Upload} from "antd";
import {formatPhone, uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {getRequest, useCrud} from "../../../hooks/useCrud.jsx";
import {Link} from "react-router-dom";
import {fields} from "./formFields.js";
import $api from "../../../api/apiConfig.js";
import {CaretDownOutlined, CloudUploadOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker
const { TextArea } = Input


// fetches
const fetchData = () => getRequest(`/university/all`)

const fetchRegions = async () => {
    const { data } = await $api.get('/regions/all')
    return data
}


const AdminUni = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)


    // fetch
    const { data, refetch } = useQuery({
        queryKey: ['university'],
        queryFn: fetchData,
        keepPreviousData: true,
    })
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
            application_start: dates ? dates?.[0]?.valueOf() : new Date(selectedItem?.application_start).getTime(),
            application_end: dates ? dates?.[1]?.valueOf() : new Date(selectedItem?.application_end).getTime(),
            logo_id: values.logo_id?.file?.response?.files[0]?.id || selectedItem?.logo_id,
            photo_id: values.photo_id?.file?.response?.files[0]?.id || selectedItem?.photo_id,
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


    // table
    const columns = [
        tableCols.id,
        {
            ...tableCols.name,
            render: (_, item) => (
                <Link to={`/admin/university/${item.id}`}>{ item.name }</Link>
            )
        },
        {
            ...tableCols.phone,
            render: (_, { phone_number }) => (
                <span>{ formatPhone(phone_number) }</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ariza boshlanishi',
            dataIndex: 'application_start',
            key: 'application_start',
            render: (_, { application_start }) => (
                <span>{new Date(application_start).toLocaleDateString()}</span>
            )
        },
        {
            title: 'Ariza tugashi',
            dataIndex: 'application_end',
            key: 'application_end',
            render: (_, { application_end }) => (
                <span>{new Date(application_end).toLocaleDateString()}</span>
            )
        },
        {
            ...tableCols.status,
            render: (_, { status }) => (
                <span className={
                    `fw500 ${status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'yellow'}`
                }>{ status }</span>
            )
        },
        {
            ...tableCols.actions,
            render: (_, i) => <Actions
                setModal={setModal}
                setSelectedItem={setSelectedItem}
                deleteItem={deleteItem}
                i={i}
            />
        },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title='Universitetlar ~ university'
                    setModal={setModal}
                    btn
                />
                <div className="content">
                    <Table
                        columns={columns}
                        dataSource={data?.data}
                        scroll={{ x: 750 }}
                    />
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

export default AdminUni