import '../App.less';

import React, { useState } from 'react';
// import * as dayjs from 'dayjs'

import { Row, Col, Typography, Space, Button, DatePicker } from 'antd';

const { Title } = Typography;

const DateFilter = (props) => {
    const { label } = props;
    const [date, setDate] = useState()

    return (
        <>
            <DatePicker onOk={(date) => {
                setDate(date)
            }} />
        </>
    )
};

export default DateFilter;