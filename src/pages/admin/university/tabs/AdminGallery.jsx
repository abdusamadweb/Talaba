import React, {useEffect, useState} from 'react';
import Title from "../../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Empty, Form, Input, Modal, Table, Upload} from "antd";
import {uploadProps, validateMessages} from "../../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import GetFile from "../../../../components/get-file/GetFile.jsx";
import {$adminResp} from "../../../../api/apiResp.js";
import {tableCols} from "../../../../components/admin/table/columns.js";
import Actions from "../../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../../hooks/useCrud.jsx";
import {CloudUploadOutlined} from "@ant-design/icons";


const AdminGallery = ({ id }) => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)

    const [file, setFile] = useState(null)


    // fetch
    const fetchData = async () => {
        const {data} = await $adminResp.get(`/gallery/get-by-unv/${id}`)
        return data
    }
    const {data, refetch} = useQuery({
        queryKey: ['gallery', id],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    // add & edit
    const {addOrEditMutation, deleteMutation}
        = useCrud('gallery', {
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
            photo_id: values?.photo_id?.fileList?.[0]?.response?.files[0].id,
            status: values.status ? 'active' : 'inactive',
            university_id: id
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
            setYt(selectedItem.is_youtube)
        } else {
            form.resetFields()
        }
    }, [form, selectedItem])

    const [yt, setYt] = useState(false)


    // table
    const columns = [
        tableCols.id,
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (link) => (
                link ? <a href={link} target='_blank'>{link}</a>
                    : <span>_</span>
            )
        },
        {
            title: 'Youtube',
            dataIndex: 'is_youtube',
            key: 'is_youtube',
            render: (is_youtube) => (
                <span>{is_youtube ? 'Ha' : 'Yoq'}</span>
            ),
        },
        {
            title: 'Rasmi',
            dataIndex: 'photo_id',
            key: 'photo_id',
            render: (photo_id) => (
                photo_id ? <GetFile className='ant-image-img' id={photo_id}/>
                    : <span>_</span>
            ),
        },
        {
            ...tableCols.status,
            render: (_, {status}) => (
                <span className={
                    `fw500 ${status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'yellow'}`
                }>{status}</span>
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
        <div className="tab-content">
            <Title
                title='Galereya ~ gallery'
                setModal={setModal}
                className='d-flex'
                btn
            />
            <div className="content">
                <Table
                    columns={columns}
                    dataSource={data?.data}
                    scroll={{x: 750}}
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
                    setYt(false)
                }}
            >
                <Form
                    onFinish={onFormSubmit}
                    layout='vertical'
                    validateMessages={validateMessages}
                    form={form}
                >
                    <Form.Item
                        name='is_youtube'
                        valuePropName="checked"
                        onChange={(e) => setYt(e.target.checked)}
                    >
                        <Checkbox className='no-copy'>Youtube?</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name='link'
                        label="Link"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Link" />
                    </Form.Item>

                    {
                        !yt &&
                        <Form.Item
                            className='form-inp docs'
                            label="Rasmlar ( 5mb dan kam bolgan holda! )"
                            name="photo_id"
                            rules={[{ required: !yt, message: '' }]}
                        >
                            <Upload {...uploadProps} maxCount={4} multiple={true} onChange={(e) => setFile(e.file.percent)}>
                                <Input
                                    rootClassName={`upload-inp ${file !== null && 'change-icon'}`}
                                    size='large'
                                    suffix={<CloudUploadOutlined/>}
                                    prefix={file !== null ? file?.toFixed(1) + '%' : 'Yuklash'}
                                />
                            </Upload>
                        </Form.Item>
                    }

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

export default AdminGallery