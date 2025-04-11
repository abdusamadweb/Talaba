import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Form, Input, Modal, Table, DatePicker} from "antd";
import {formatPhone, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$resp} from "../../../api/apiResp.js";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {Link} from "react-router-dom";

const { RangePicker } = DatePicker
const { TextArea } = Input


// fetches
const fetchData = async () => {
    const { data } = await $resp.get('/university/all')
    return data
}

const AdminUni = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // fetch
    const { data, refetch } = useQuery({
        queryKey: ['university'],
        queryFn: fetchData,
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
            application_start: new Date(dates[0].$d)?.getTime(),
            application_end: new Date(dates[1].$d)?.getTime(),
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


    // form fields
    const fields = [
        { name: 'name', label: 'Nomi', type: 'text', required: true, placeholder: 'Nomi' },
        { name: 'phone_number', label: 'Telefon', type: 'text', required: true, placeholder: 'Telefon' },
        { name: 'site', label: 'Sayt', type: 'text', required: true, placeholder: 'Sayt' },
        { name: 'email', label: 'Email', type: 'text', required: true, placeholder: 'Email' },
        { name: 'address', label: 'Manzil', type: 'text', required: true, placeholder: 'Manzil' },
        { name: 'longitude', label: 'Longitude', type: 'text', required: true, placeholder: 'Longitude' },
        { name: 'latitude', label: 'Latitude', type: 'text', required: true, placeholder: 'Latitude' },
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

                    <Form.Item name='dates'>
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

export default AdminUni