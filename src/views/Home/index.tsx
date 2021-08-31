import React from "react";
import { Col, Row } from "antd";
import { CoinSelector } from '../../components/CoinSelector';

export const HomeView = () => {
    return (
        <Row gutter={[16, 16]} align="middle">
            <Col span={24} />
            <Col span={12}>
                <CoinSelector />
            </Col>
            <Col span={12} />
            <Col span={24} />
        </Row>
    );
}