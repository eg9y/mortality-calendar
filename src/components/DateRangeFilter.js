import React, { useState } from 'react';
import { Row, Col, Typography, DatePicker } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const DateRangeFilter = (props) => {

    const [dates, setDates] = useState([]);

    const disabledDate = current => {
        if (!dates || dates.length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
        return tooEarly || tooLate;
    };

    return (
        <Row>
            <Col span={24} gutter={[16, 16]}>
                <RangePicker
                    // disabledDate={disabledDate}
                    onCalendarChange={value => {
                        setDates(value);
                    }}
                />
            </Col>
        </Row>
    );
};

export default DateRangeFilter;