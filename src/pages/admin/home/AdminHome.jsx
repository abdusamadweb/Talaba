import './Home.scss'
import React from 'react';
import {Card, Col, Progress, Row, Statistic} from "antd";
import {getRequest} from "../../../hooks/useCrud.jsx";
import {useQuery} from "@tanstack/react-query";
import Title from "../../../components/admin/title/Title.jsx";

const AdminHome = () => {


    // fetches
    const fetchData = () => getRequest(`/statistic/main-statistics`)
    const { data } = useQuery({
        queryKey: ['main-statistics'],
        queryFn: fetchData,
        keepPreviousData: true,
    })


    return (
        <div className='admin-home other page'>
            <div className="container">
                <Title title='Dashboard' />
                <div className="row flex-column pt2 g1">
                    <Progress percent={50} status="active"/>

                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Card className='stc' variant="borderless">
                                <Statistic
                                    title="Bot userlar soni:"
                                    value={data?.main_stc?.[0]?.bot_users}
                                    valueStyle={{color: '#3f8600'}}
                                    prefix={<i className="fa-solid fa-users-rays"/>}
                                    suffix="ta"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='stc' variant="borderless">
                                <Statistic
                                    title="Umumiy arizalar soni:"
                                    value={data?.main_stc?.[0]?.applications}
                                    valueStyle={{color: '#3f8600'}}
                                    prefix={<i className="fa-solid fa-graduation-cap"/>}
                                    suffix="ta"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card className='top-uni' variant='borderless'>
                                <span className="title">Top ariza qoldirilgan universitetlar:</span>
                                <ul className='list'>
                                    {data?.data?.university_statistic?.map((i, index) => (
                                        <li className='item' key={index}>
                                            <div className='d-flex align-center g10'>
                                                <span className='item__index'>{index + 1}</span>
                                                <span className='item__title'>{i.university_name}</span>
                                            </div>
                                            <span className='dots'/>
                                            <span className='item__count'>{i.application_count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Col>
                    </Row>

                    <Statistic title="Active Users" value={1128293}/>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;