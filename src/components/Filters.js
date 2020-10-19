import '../App.less';

import React, { useState } from 'react';
import * as dayjs from 'dayjs'

import { Form, Button, Input, Row, Col, Switch } from 'antd';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import DatePicker from "./DatePicker";
const { RangePicker } = DatePicker;


const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};

const Filters = (props) => {
    const { setFields, form } = props;

    const [newPhaseName, setNewPhaseName] = useState('');
    const [dynamicFields, setDynamicFields] = useState([]);

    const onFinish = values => {
        console.log('Success:', values);
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current >= dayjs().endOf('day');
    }

    const onChange = newFields => {
        setFields(newFields);
    }

    return (
        <Form
            form={form}
            {...layout}
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            onValuesChange={(changedFields, allFields) => {
                console.log('onFieldsChange');
                onChange(allFields);
            }}
        >
            <Form.Item
                name='birthDate'
                label='Birthdate'
                required={true}
            >
                <DatePicker disabledDate={disabledDate} defaultValue={dayjs('1998-09-08')} />
            </Form.Item>
            <Form.List
                name="phases"
            >
                {(fields, { add, remove }, { errors }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={<>{dynamicFields[index]}

                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ margin: '2px 8px' }}
                                            onClick={() => {
                                                setDynamicFields(fields => {
                                                    console.log(fields);
                                                    return fields.filter((_, index) => index !== parseInt(field.name));
                                                })
                                                remove(field.name);
                                            }}
                                        />
                                    </>}
                                    name={index}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        noStyle
                                    >
                                        <RangePicker
                                            allowEmpty={[false, false]}
                                            style={{ width: "75%" }}
                                            suffixIcon={<></>}
                                            picker="week"
                                            placeholder={['Start', 'End']}
                                            renderExtraFooter={() => 'end date is optional'}
                                        />
                                    </Form.Item>

                                    <Switch checkedChildren="range" unCheckedChildren="date" defaultChecked />
                                </Form.Item>
                            ))}
                            <Form.Item
                            >
                                <Row>
                                    <Col span={12}>
                                        <Input placeholder="phase name"
                                            value={newPhaseName}
                                            onChange={(value, coco) => {
                                                setNewPhaseName(value.target.value)
                                            }} />
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={async () => {
                                                    try {
                                                        if (!newPhaseName || newPhaseName.length === 0) {
                                                            console.log('error!!!', newPhaseName);
                                                            return Promise.reject(new Error('Must enter phase name'));
                                                        } else {
                                                            add();
                                                            setDynamicFields((phases) => [...phases, newPhaseName]);
                                                            setNewPhaseName('');
                                                        }
                                                    } catch (errorInfo) {
                                                        console.log('Failed:', errorInfo);
                                                    }
                                                }}
                                            >
                                                <PlusOutlined /> Add phase
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Form.ErrorList errors={errors} />
                                </Row>
                            </Form.Item>

                            {/* <Form.Item
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
                            </Form.Item> */}
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
};


export default Filters;