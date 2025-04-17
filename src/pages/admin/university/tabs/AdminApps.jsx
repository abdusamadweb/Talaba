import React, {useEffect, useState} from 'react';
import Title from "../../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Form, Input, Modal, Table} from "antd";
import {formatPhone, validateMessages} from "../../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp, $resp} from "../../../../api/apiResp.js";
import {tableCols} from "../../../../components/admin/table/columns.js";
import Actions from "../../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../../hooks/useCrud.jsx";
import profile from "../../../../assets/images/user-img.svg";
import GetFile from "../../../../components/get-file/GetFile.jsx";


const fetchApps = async ({ queryKey }) => {
    const [, params, body] = queryKey
    const { data } = await $resp.post('/application/all', body, { params })
    return data
}


const AdminApps = ({ id }) => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // filter data
    const [params, setParams] = useState({ page: 1, size: 20 })
    const [body, setBody] = useState({
        search: '',
        university_id: id,
        edu_type: null,
        main_direction_id: null
    })

    const { data, isLoading: loading, refetch } = useQuery({
        queryKey: ['filteredData', params, body],
        queryFn: fetchApps,
        keepPreviousData: true,
    })


    // add & edit
    const { addOrEditMutation, deleteMutation }
        = useCrud('edu-d-group', {
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
            status: values.status ? 'active' : 'inactive',
            university_id: id
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
            title: 'Universitet nomi',
            dataIndex: 'university',
            key: 'university',
            render: (_, item) => (
                <span>{ item.university.name }</span>
            )
        },
        {
            title: 'Yonalishi',
            dataIndex: 'edu_direction_name',
            key: 'edu_direction_name',
        },
        {
            title: 'Tili',
            dataIndex: 'edu_lang',
            key: 'edu_lang',
            render: (_, item) => (
                <span>{ item.edu_lang.name }</span>
            )
        },
        {
            title: 'Shakli',
            dataIndex: 'edu_type',
            key: 'edu_type',
            render: (_, item) => (
                <span>{ item.edu_direction.edu_type[0] }</span>
            )
        },
        {
            title: 'Talaba ismi',
            dataIndex: 'user_name',
            key: 'user_name',
            render: (_, item) => (
                <span>{ item.user.first_name + ' ' + item.user.last_name }</span>
            )
        },
        {
            title: 'Talaba telefon raqami',
            dataIndex: 'user_phone',
            key: 'user_phone',
            render: (_, item) => (
                <span>{ formatPhone(item.user.phone_number) }</span>
            )
        },
        {
            ...tableCols.status,
            render: (_, { status }) => (
                <span className={
                    `fw500 ${status === 'active' ? 'green' : status === 'Bekor qilindi' ? 'red' : 'yellow'}`
                }>{ status }</span>
            )
        },
        {
            ...tableCols.actions,
            render: (_, i) => <Actions
                view
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
    console.log(selectedItem)


    return (
        <div className="tab-content">
            <Title
                title='Arizalar ~ applications'
                setModal={setModal}
                className='d-flex'
            />
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data?.data}
                    scroll={{ x: 750 }}
                />
            </div>
            <Modal
                rootClassName='admin-modal'
                className='main-modal'
                title={modal === 'add' ? "Qoshish" : "Ozgartirish"}
                open={modal === 'add' || modal === 'edit'}
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
            <Modal
                rootClassName='admin-modal'
                className='main-modal user-view-modal'
                width={1000}
                title="Batafsil"
                open={modal === 'view'}
                onCancel={() => {
                    setModal('close')
                    setSelectedItem(null)
                }}
            >
                <div className="content">
                    <div className="content__head row between g1 pb1">
                        <div className="row align-center g1">
                            <div className="imgs">
                                <GetFile className='img' id={selectedItem?.user?.avatar_id} defImg={profile}/>
                            </div>
                            <div>
                                <span
                                    className="name">{selectedItem?.user?.first_name + ' ' + selectedItem?.user?.last_name}</span>
                                <span className='name'>{formatPhone(selectedItem?.user?.phone_number)}</span>
                                <span
                                    className='name'>{new Date(selectedItem?.user?.birth_date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <span>chat_id: { selectedItem?.user?.chat_id }</span>
                    </div>
                    <div className='content__body'>
                        <div>
                            <div className="items">
                                <span className='title'>Passport seriyasi:</span>
                                <span className="txt">{ selectedItem?.user?.passport_code }</span>
                            </div>
                            <div className="items">
                                <span className='title'>Regestratsiyadan otkan sanasi:</span>
                                <span className="txt">{ new Date(selectedItem?.user?.created_at).toLocaleDateString() }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminApps