import './AdminAds.scss'
import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Empty, Form, Input, Modal, Table, Upload} from "antd";
import {uploadProps, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import GetFile from "../../../components/get-file/GetFile.jsx";
import {$resp} from "../../../api/apiResp.js";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import {CloudUploadOutlined} from "@ant-design/icons";


// fetches
const fetchData = async () => {
    const { data } = await $resp.get('/ads/all')
    return data
}


const AdminAds = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file, setFile] = useState(null)


    // fetch
    const { data, refetch } = useQuery({
        queryKey: ['admin-ads'],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    // add & edit
    const { addOrEditMutation, deleteMutation } = useCrud('ads', {
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
            form.setFieldsValue(selectedItem)
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
        tableCols.name,
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link'
        },
        {
            title: 'Indeksi',
            dataIndex: 'order_index',
            key: 'order_index'
        },
        {
            title: 'Korishlar soni',
            dataIndex: 'view_count',
            key: 'view_count'
        },
        {
            title: 'Rasmlar',
            dataIndex: 'photo_ids',
            key: 'photo_ids',
            render: (photo_ids) => (
                photo_ids?.length ?
                    <ul className='imgs'>
                        {photo_ids.map((i) => (
                            <li key={i}><GetFile className='ant-image-img' id={i}/></li>
                        ))}
                    </ul>
                    : <Empty description={false} />
            ),
        },
        tableCols.status,
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
        { name: 'link', label: 'Link', type: 'text', required: true, placeholder: 'Link' },
        { name: 'order_index', label: 'Indeksi', type: 'number', required: true, placeholder: 'Indeksi' },
    ]


    return (
        <div className="other page">
            <div className="container">
                <Title
                    title='Reklama ~ ads'
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
                        <Checkbox>Status</Checkbox>
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

export default AdminAds