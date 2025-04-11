import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Form, Input, Modal, Table} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$resp} from "../../../api/apiResp.js";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";


// fetches
const fetchData = async () => {
    const { data } = await $resp.get('/main-direction/all')
    return data
}


const AdminMainDir = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [selectedImg, setSelectedImg] = useState(null)


    // fetch
    const { data, refetch } = useQuery({
        queryKey: ['main-direction'],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('main-direction', {
        refetch,
        form,
        setModal,
        setSelectedItem,
        addOrEdit,
        deleteData
    })

    const onFormSubmit = (values) => {
        const body = {
            ...values,
            status: values.status ? 'active' : 'inactive'
        }

        addOrEditMutation.mutate({
            values: body,
            selectedItem
        })
        setTimeout(() => setSelectedImg(null), 1000)
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


    // images
    const images = import.meta.glob('../../../assets/images/direction/*.svg', { eager: true, import: 'default' })

    const flags = Object.keys(images).reduce((acc, path) => {
        const key = path.split('/').pop().split('.')[0] // dir1, dir2, ...
        acc[key] = images[path]
        return acc
    }, {})


    // table
    const columns = [
        // {
        //     ...tableCols.index,
        //     render: (_, __, index) => <span>{ index+1 }</span>,
        // },
        tableCols.id,
        tableCols.name,
        {
            title: 'Rasm',
            dataIndex: 'flag',
            key: 'flag',
            render: (_, { flag }) => (
                <img src={flags[flag]} alt="direction-img"/>
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
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title='Asosiy yonalishlar ~ main-direction'
                    setModal={setModal}
                    btn
                />
                <div className="content">
                    <Table
                        columns={columns}
                        dataSource={data}
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
                            rules={[{required: item.required}]}
                        >
                            <Input
                                placeholder={item.placeholder}
                                type={item.type}
                            />
                        </Form.Item>
                    ))}
                    <Form.Item
                        name='status'
                        valuePropName="checked"
                    >
                        <Checkbox className='no-copy'>Status</Checkbox>
                    </Form.Item>

                    <ul className="select-imgs row">
                        {Object.entries(flags).map(([key, img]) => (
                            <li
                                key={key}
                                className={`item ${selectedImg === key && 'active'}`}
                                onClick={() => {
                                    const newValue = selectedImg === key ? null : key
                                    setSelectedImg(newValue)
                                    form.setFieldValue('flag', newValue)
                                }}>
                                    <img src={img} alt={key}/>
                                </li>
                        ))}
                    </ul>
                    <Form.Item name="flag">
                        <Input value={selectedImg} hidden/>
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

export default AdminMainDir