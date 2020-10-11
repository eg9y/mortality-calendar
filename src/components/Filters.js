import '../App.less';

import React, { useEffect } from 'react';
import DateFilter from "./DateFilter";
import DateRangeFilter from "./DateRangeFilter";

import { Form, Input, Button, Checkbox, DatePicker } from 'antd';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};

const Filters = (props) => {
    const { form } = props;

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onBirthDateChange = values => {
        console.log('onBirthDateChange:', values);
    };

    return (
        <Form
            {...layout}
            layout="vertical"
            form={form} name="control-hooks"
            onFinish={onFinish}
            name="dynamic_form_item"
        >
            <Form.List
                name="names"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 2) {
                                return Promise.reject(new Error('At least 2 passengers'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => {
                    return (
                        <div>
                            <Form.Item
                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label='Birthdate'
                                required={true}
                            >
                                <DateRangeFilter />
                            </Form.Item>
                            <Form.Item
                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label='Elementary school'
                                required={false}
                            >
                                <DateRangeFilter label="Date Range" />
                            </Form.Item>
                            <Form.Item
                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label='Middle school'
                                required={false}
                            >
                                <DateRangeFilter />
                            </Form.Item>
                            <Form.Item
                                // {...(index === 0 ? formItemLayout :a formItemLayoutWithOutLabel)}
                                label='Highschool'
                                required={false}
                            >
                                <DateRangeFilter />
                            </Form.Item>
                            {fields.map((field, index) => (
                                <Form.Item
                                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Birth Date' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input passenger's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="passenger name" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '60%' }}
                                >
                                    <PlusOutlined /> Add field
                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                            <Form.Item
                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label='Avg work hours/day'
                                required={false}
                            >
                                <Input
                                    defaultValue={8}
                                />
                            </Form.Item>
                            <Form.Item
                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label='Avg sleep time'
                                required={false}

                            >
                                <Input
                                    defaultValue={7}
                                />
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};


export default Filters;