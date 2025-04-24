import React, {useEffect, useState} from 'react';
import Title from "../../../components/admin/title/Title.jsx";
import {Button, Checkbox, Form, Input, Modal, Select, Slider, Table} from "antd";
import {formatPhone, formatPrice, validateMessages} from "../../../assets/scripts/global.js";
import {addOrEdit, deleteData} from "../../../api/crud.js";
import {useQuery} from "@tanstack/react-query";
import {$adminResp} from "../../../api/apiResp.js";
import {tableCols} from "../../../components/admin/table/columns.js";
import Actions from "../../../components/admin/table/Actions.jsx";
import {useCrud} from "../../../hooks/useCrud.jsx";
import profile from "../../../assets/images/user-img.svg";
import GetFile from "../../../components/get-file/GetFile.jsx";


const fetchApps = async ({ queryKey }) => {
    const [, params, body] = queryKey
    const { data } = await $adminResp.post('/application/all', body, { params })
    return data
}


const AdminApps = () => {

    const [form] = Form.useForm()

    const [modal, setModal] = useState('close')
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selUni, setSelUni] = useState(null)
    const [selDir, setSelDir] = useState(null)
    const [selType, setSelType] = useState(null)
    const [q, setQ] = useState('')
    const [status, setStatus] = useState('inactive')


    // filter data
    const [params, setParams] = useState({ page: 1, size: 20 })
    const [body, setBody] = useState({
        search: '',
        university_id: null,
        main_direction_id: null,
        edu_type: null,
        status: null,

        fromPrice: null,
        toPrice: null
    })

    const { data, refetch } = useQuery({
        queryKey: ['filteredData', params, body],
        queryFn: fetchApps,
        keepPreviousData: true,
    })

    const updateFilters = () => {
        setLoading(true)

        setParams({ page: 1, size: 20 })
        setBody({
            search: q,
            university_id: selUni,
            main_direction_id: selDir,
            edu_type: selType,
            status: status,

            fromPrice: ranges.from,
            toPrice: ranges.to
        })
        refetch()
        setTimeout(() => setLoading(false), 1000)
    }


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
            // university_id: id
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
                    `fw500 ${status === 'Qabul qilindi' ? 'green' : status === 'Bekor qilindi' ? 'red' : 'yellow'}`
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


    // fetch for select
    const fetchUni = async () => {
        const { data } = await $adminResp.get(`/university/all`)
        return data
    }
    const { data: uni } = useQuery({
        queryKey: ['university'],
        queryFn: fetchUni,
        keepPreviousData: true,
    })

    const fetchDir = async () => {
        const { data } = await $adminResp.get(`/main-direction/all`)
        return data
    }
    const { data: dir } = useQuery({
        queryKey: ['main-direction'],
        queryFn: fetchDir,
        keepPreviousData: true,
    })

    const fetchType = async () => {
        const { data } = await $adminResp.get(`/edu-d-group/all-by-unv/${selUni}`)
        return data
    }
    const { data: type } = useQuery({
        queryKey: ['edu-type-id', selUni],
        queryFn: fetchType,
        enabled: !!selUni,
        keepPreviousData: true,
    })

    const [ranges, setRanges] = useState({
        from: 5000000,
        to: 100000000,
    })
    const changeRange = (val) => {
        return setRanges({from: val[0]*1000000, to: val[1]*1000000})
    }


    return (
        <div className="tab-content admin-apps other page">
            <div className="container">
                <Title
                    title='Arizalar ~ applications'
                    setModal={setModal}
                    className='d-flex'
                />
                <div className="content">
                    <div className='filters'>
                        <div>
                            <div className="row g10">
                                <Select
                                    size='large'
                                    showSearch
                                    placeholder="Universitet tanlang"
                                    optionFilterProp="label"
                                    options={[
                                        { value: null, label: 'Tanlanmadi' },
                                        ...(uni?.data?.map(i => ({
                                            value: i.id,
                                            label: i.name
                                        })) || [])
                                    ]}
                                    onChange={(e) => setSelUni(e)}
                                />
                                <Select
                                    size='large'
                                    showSearch
                                    placeholder="Asosiy yonalish tanlang"
                                    optionFilterProp="label"
                                    options={[
                                        { value: null, label: 'Tanlanmadi' },
                                        ...(dir?.map(i => ({
                                            value: i.id,
                                            label: i.name
                                        })) || [])
                                    ]}
                                    onChange={(e) => setSelDir(e)}
                                />
                                <Select
                                    size='large'
                                    showSearch
                                    placeholder="Talim darajasi tanlang"
                                    optionFilterProp="label"
                                    options={[
                                        { value: null, label: 'Tanlanmadi' },
                                        ...(type?.map(i => ({
                                            value: i.id,
                                            label: i.name
                                        })) || [])
                                    ]}
                                    onChange={(e) => setSelType(e)}
                                />
                                <div className="range">
                                    <Slider
                                        range
                                        step={5}
                                        defaultValue={[5, 100]}
                                        onChange={changeRange}
                                    />
                                    <div className="row between">
                                        <span className='txt'>{formatPrice(ranges.from) || 0} UZS</span>
                                        <span className='txt'>{formatPrice(ranges.to) || 0} UZS</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-center g10">
                                <Input
                                    className='inp'
                                    size='large'
                                    suffix={<i className="fa-solid fa-magnifying-glass"/>}
                                    placeholder='Qidirish . . .'
                                    onChange={(e) => setQ(e.target.value)}
                                />
                                <Checkbox
                                    className='no-copy'
                                    onChange={e => setStatus(e.target.checked ? 'active' : 'inactive')}
                                >
                                    Status
                                </Checkbox>
                            </div>
                        </div>
                        <Button
                            className='btn'
                            type="primary"
                            onClick={updateFilters}
                            loading={loading}
                        >
                            Qidirish
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data?.data}
                        scroll={{x: 750}}
                    />
                </div>
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
                        <span>chat_id: {selectedItem?.user?.chat_id}</span>
                    </div>
                    <div className='content__body'>
                        <div>
                            <div className="items">
                                <span className='title'>Regestratsiyadan otkan sanasi:</span>
                                <span
                                    className="txt">{new Date(selectedItem?.user?.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="items">
                                <span className='title'>Passport seriyasi:</span>
                                <span className="txt">{selectedItem?.user?.passport_code}</span>
                            </div>
                            <div className="items">
                                <span className="title">Dokumentlar:</span>
                                <div className="row g1">
                                    <GetFile id={selectedItem?.user?.diploma_file_id}/>
                                    <GetFile id={selectedItem?.user?.passport_file_id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminApps