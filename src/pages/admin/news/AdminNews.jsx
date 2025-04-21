import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Empty, Form, Input, Modal, Table, Upload} from "antd";
import {uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {getRequest, useCrud} from "../../../hooks/useCrud.jsx";
import GetFile from "../../../components/get-file/GetFile.jsx";
import {CloudUploadOutlined} from "@ant-design/icons";


// fetches
const fetchData = () => getRequest(`/news/all`)


const AdminEduLang = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file, setFile] = useState(null)


    // fetch
    const { data, refetch } = useQuery({
        queryKey: ['news'],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('news', {
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
            photo_ids: values?.photo_ids?.fileList?.map(i => i?.response?.files[0].id),
            status: values.status ? 'active' : 'inactive'
        }

        addOrEditMutation.mutate({
            values: body,
            selectedItem
        })
        setTimeout(() => setFile(null), 1500)
    }

    const deleteItem = (id) => {
        deleteMutation.mutate(id)
    }


    // form
    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                ...selectedItem,
                photo_ids: selectedItem.attachments?.map(item => item.id)
            })
        } else {
            form.resetFields()
        }
    }, [form, selectedItem])


    // table
    const columns = [
        // {
        //     ...tableCols.index,
        //     render: (_, __, index) => <span>{ index+1 }</span>,
        // },
        tableCols.id,
        tableCols.title,
        tableCols.desc,
        {
            title: 'Rasmlar',
            dataIndex: 'attachments',
            key: 'attachments',
            render: (photo_ids) => (
                photo_ids?.length ?
                    <ul className='imgs'>
                        {photo_ids.map((i) => (
                            <li key={i.id}><GetFile className='ant-image-img' id={i.id} /></li>
                        ))}
                    </ul>
                    : <Empty description={false} />
            ),
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
        { name: 'title', label: 'Sarlavxa', type: 'text', required: true, placeholder: 'Sarlavxa' },
        { name: 'desc', label: 'Tavsif', type: 'text', required: true, placeholder: 'Tavsif' },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title='Yangiliklar ~ news'
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

                    <Form.Item
                        className='form-inp docs'
                        label="Rasmlar ( 5mb dan kam bolgan holda! )"
                        name="photo_ids"
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

export default AdminEduLang