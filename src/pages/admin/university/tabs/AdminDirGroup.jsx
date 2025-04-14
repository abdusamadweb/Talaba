import React, {useEffect, useState} from 'react';
import Title from "../../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Form, Input, Modal, Table} from "antd";
import {validateMessages} from "../../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../../../api/apiResp.js";
import {tableCols} from "../../../../components/admin/table/columns.js";
import Actions from "../../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../../hooks/useCrud.jsx";


const AdminDirGroup = ({ id }) => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // fetch
    const fetchData = async () => {
        const { data } = await $adminResp.get(`/edu-d-group/all-by-unv/${id}`)
        return data
    }
    const { data, refetch } = useQuery({
        queryKey: ['edu-d-group', id],
        queryFn: fetchData,
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
            status: values.status ? 'active' : 'inactive'
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
        tableCols.name,
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
        <div className="tab-content">
            <Title
                title='Talim turi ~ edu-d-group'
                setModal={setModal}
                className='d-flex'
                btn
            />
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 750 }}
                />
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

export default AdminDirGroup