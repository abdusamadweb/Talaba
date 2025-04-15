import React, {useEffect, useState} from 'react';
import Title from "../../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Form, Input, Modal, Select, Table} from "antd";
import {validateMessages} from "../../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../../../api/apiResp.js";
import {tableCols} from "../../../../components/admin/table/columns.js";
import Actions from "../../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../../hooks/useCrud.jsx";
import {CaretDownOutlined} from "@ant-design/icons";

const { TextArea } = Input


// fetch
const fetchLangs = async () => {
    const { data } = await $adminResp.get('/edu-lang/all')
    return data
}
const fetchMainDirs = async () => {
    const { data } = await $adminResp.get('/main-direction/all')
    return data
}


const AdminDir = ({ id }) => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)


    // fetch
    const fetchData = async () => {
        const { data } = await $adminResp.get(`/edu-direction/all-by-unv/${id}`)
        return data
    }
    const { data, refetch } = useQuery({
        queryKey: ['edu-direction', id],
        queryFn: fetchData,
        keepPreviousData: true,
    })

    // fetch langs
    const { data: edulangs } = useQuery({
        queryKey: ['edu-langs'],
        queryFn: fetchLangs,
        keepPreviousData: true,
    })
    // fetch main-dirs
    const { data: mainDirs } = useQuery({
        queryKey: ['main-direction'],
        queryFn: fetchMainDirs,
        keepPreviousData: true,
    })

    // fetch edu-dir-group
    const fetchEduGroup = async () => {
        const { data } = await $adminResp.get(`/edu-d-group/all-by-unv/${id}`)
        return data
    }
    const { data: eduGroup } = useQuery({
        queryKey: ['edu-d-group', id],
        queryFn: fetchEduGroup,
        keepPreviousData: true,
    })
    console.log(eduGroup)


    // add & edit
    const { addOrEditMutation, deleteMutation }
        = useCrud('edu-direction', {
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
            contract_price: values.contract_price | 0,
            university_id: id,
        }
        console.log(body)

        // addOrEditMutation.mutate({
        //     values: body,
        //     selectedItem
        // })
    }

    const deleteItem = (id) => {
        deleteMutation.mutate(id)
    }


    // form
    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                ...selectedItem,
                main_direction_id: selectedItem.edu_lang_ids || null,
                edu_lang_ids: selectedItem.edu_langs?.map(lang => lang.id) || []
            })
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
        { name: 'contract_price', label: 'Kontrakt narxi', type: 'number', required: true, placeholder: 'Kontrakt narxi' },
    ]


    return (
        <div className="tab-content">
            <Title
                title='Talim yonalishi ~ edu-direction'
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

                    <Form.Item name='desc' label='Tavsif' rules={[{ required: true }]}>
                        <TextArea rows={3} placeholder='Tavsif' />
                    </Form.Item>

                    <Form.Item
                        name='edu_direction_group_id'
                        label='Talim turi'
                        rules={[{ required: true }]}
                    >
                        <Select
                            size="large"
                            placeholder="Talim turi"
                            options={eduGroup?.map(i => ({
                                value: i.id,
                                label: i.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name='main_direction_id'
                        label='Talim yonalishi'
                        rules={[{ required: true }]}
                    >
                        <Select
                            size="large"
                            placeholder="Talim turi"
                            options={mainDirs?.map(i => ({
                                value: i.id,
                                label: i.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name='edu_lang_ids'
                        label='Talim tili'
                        rules={[{ required: true }]}
                    >
                        <Select
                            mode="multiple"
                            size="large"
                            placeholder="Talim tili"
                            options={edulangs?.map(i => ({
                                value: i.id,
                                label: i.name,
                            }))}
                        />
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

export default AdminDir