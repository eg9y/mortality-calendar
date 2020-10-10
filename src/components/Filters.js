import '../App.less';

import React from 'react';
import DateFilter from "./DateFilter";
import DateRangeFilter from "./DateRangeFilter";

import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};



const Filters = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            {...layout}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item label="Birthdate" style={{ color: "white" }}>
                <DateFilter></DateFilter>
            </Form.Item>
            <Form.Item label="Elementary" style={{ color: "white" }}>
                <DateRangeFilter ></DateRangeFilter>
            </Form.Item>
            <Form.Item label="Middle School" style={{ color: "white" }}>
                <DateRangeFilter ></DateRangeFilter>
            </Form.Item>
            <Form.Item label="High School" style={{ color: "white" }}>
                <DateRangeFilter ></DateRangeFilter>
            </Form.Item>
            <Form.Item label="College" style={{ color: "white" }}>
                <DateRangeFilter></DateRangeFilter>
            </Form.Item>
            <Form.Item label="Grad School" style={{ color: "white" }}>
                <DateRangeFilter ></DateRangeFilter>
            </Form.Item>
        </Form>
    )
};

export default Filters;