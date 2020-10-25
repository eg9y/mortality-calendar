import '../App.less';

import React, { useState } from 'react';
import * as dayjs from 'dayjs'
import { Form, Button, Input, Row, Col, Popover } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CompactPicker } from 'react-color';

import DatePicker from "./DatePicker";
const { RangePicker } = DatePicker;


const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};

const Filters = (props) => {
    const { setFields, form, dynamicFields, setDynamicFields } = props;
    const [newPhaseName, setNewPhaseName] = useState('');
    const [newPhaseError, setNewPhaseError] = useState({
        status: "success",
        message: null
    });
    // const [closestPhase, setClosestPhase] = useState(null);
    let closestPast = null;
    let closestFuture = null;

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current >= dayjs().endOf('day');
    }

    function disabledRangeDate(current) {
        // Can not select days before today and today
        const newPhase = form.getFieldValue('phases');
        if (newPhase) {
            return newPhase.some((phase) => {
                if (!phase || !current) {
                    return false;
                }
                const overlapFuture = closestFuture && current >= closestFuture.endOf('day');
                const overlapPast = closestPast && current < closestPast.endOf('day');
                return (overlapFuture || overlapPast) || (current > phase[0].endOf('day') && current < phase[1].endOf('day'));
            })
        }
    }

    const onChange = newFields => {
        setFields(newFields);
    }

    const getClosestPath = (change) => {
        const newPhase = form.getFieldValue('phases');


        if (newPhase.length && newPhase[0] != null) {
            newPhase.forEach((phase) => {
                if (!phase) {
                    return;
                }

                if (change === null) {
                    closestPast = null;
                    closestFuture = null;
                    return;
                }

                if (change[0]) {
                    const checkFuture0 = phase[0].diff(change[0]);
                    if (closestFuture) {
                        if (checkFuture0 > 0 && checkFuture0 < phase[0].diff(closestFuture)) {
                            closestFuture = phase[0]
                        }
                    } else {
                        closestFuture = checkFuture0 > 0 ? phase[0] : null;
                    }
                }

                if (change[1]) {
                    const checkPast = change[1].diff(phase[1]);
                    if (closestPast) {
                        if (checkPast > 0 && checkPast < closestPast.diff(phase[1])) {
                            closestPast = phase[1]
                        }
                    } else {
                        closestPast = checkPast > 0 ? phase[1] : null;
                    }
                }
            })
            // setClosestPhase({
            //     past: closestPast,
            //     future: closestFuture
            // })
        }
    }

    return (
        <Form
            form={form}
            {...layout}
            layout="vertical"
            name="control-hooks"
            onValuesChange={(changedFields, allFields) => {
                onChange(allFields);
            }}
        >
            <Form.Item
                name='birthDate'
                label='Birthdate'
                required={true}
            >
                <DatePicker
                    disabledDate={disabledDate}
                    defaultValue={dayjs('1998-01-01')}
                    format="MMM D,YYYY"
                />
            </Form.Item>
            <Form.List
                name="phases"
            >
                {(fields, { add, remove }, { errors }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={<>{dynamicFields[index].name}

                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ margin: '2px 8px' }}
                                            onClick={() => {
                                                setDynamicFields(fields => {
                                                    return fields.filter((_, index) => index !== parseInt(field.name));
                                                })
                                                remove(field.name);
                                            }}
                                        />
                                        <Popover content={
                                            <CompactPicker
                                                color={dynamicFields[index].color}
                                                disableAlpha={true}
                                                onChange={
                                                    (color) => {
                                                        setDynamicFields((fields) => fields.map((field, currIndex) => {
                                                            if (currIndex === index) {
                                                                return {
                                                                    name: field.name,
                                                                    color: color.hex
                                                                }
                                                            }
                                                            return field;
                                                        }));
                                                    }
                                                }
                                            />
                                        } title="Title" trigger="click">
                                            <div style={{
                                                backgroundColor: dynamicFields[index].color,
                                                padding: '5px',
                                                borderRadius: '1px',
                                                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                            }}>
                                            </div>
                                        </Popover>
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
                                            disabledDate={(current) => {
                                                // Can not select days before today and today
                                                const newPhase = form.getFieldValue('phases');
                                                if (newPhase) {
                                                    return newPhase.some((phase, currIndex) => {
                                                        if (!phase || !current || currIndex === index) {
                                                            return false;
                                                        }
                                                        const overlapFuture = closestFuture && current >= closestFuture.endOf('day');
                                                        const overlapPast = closestPast && current <= closestPast.endOf('day');
                                                        return (overlapFuture || overlapPast) || (current >= phase[0].startOf('day') && current <= phase[1].endOf('day'));
                                                    })
                                                }
                                            }}
                                            style={{ width: "75%" }}
                                            suffixIcon={<></>}
                                            placeholder={['Start', 'End']}
                                            picker="month"
                                            onOpenChange={(open) => {
                                                if (open) {
                                                    const newPhase = form.getFieldValue('phases');
                                                    if (newPhase && newPhase[index]) {
                                                        getClosestPath(newPhase[index]);
                                                    }
                                                }
                                            }}
                                            onCalendarChange={getClosestPath}
                                        />
                                    </Form.Item>
                                    {/* <Switch checkedChildren="range" unCheckedChildren="date" defaultChecked /> */}
                                </Form.Item>
                            ))}
                            <Form.Item
                                help={newPhaseError.message}
                                validateStatus={newPhaseError.status}
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
                                                htmlType="submit"
                                                type="dashed"
                                                onClick={async () => {
                                                    try {
                                                        if (!newPhaseName || newPhaseName.length === 0) {
                                                            setNewPhaseError({
                                                                status: 'error',
                                                                message: 'Must enter phase name'
                                                            });
                                                            throw new Error('Must enter phase name');
                                                        } else {
                                                            add();
                                                            setDynamicFields((phases) => [...phases, {
                                                                name: newPhaseName,
                                                                color: '#333'
                                                            }]);
                                                            setNewPhaseName('');
                                                            setNewPhaseError({
                                                                status: 'success',
                                                                message: null
                                                            })
                                                        }
                                                    } catch (errorInfo) {
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