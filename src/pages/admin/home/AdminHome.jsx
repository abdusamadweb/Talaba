import React from 'react';
import {Card, Col, Progress, Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

const AdminHome = () => {
    return (
        <div className="admin-home page py2">
            <div className="container">
                <h2>Dashboard</h2>
                <div className="row flex-column p2 g1">
                    <Progress percent={50} status="active" />
                    <Col span={12}>
                        <Card variant="borderless">
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card variant="borderless">
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Statistic title="Active Users" value={112893} loading />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;