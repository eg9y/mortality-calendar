import React from 'react';

import { Card, List } from 'antd';

import Box from "./Box";


const Legend = () => {
    const data = [
        {
            title: "Not Born Yet",
            color: "#434343",
        },
        {
            title: "Past",
            color: "#874d00",
        },
        {
            title: "Future",
            color: "#7cb305",
        },
    ]
    return (
        <List
            style={{
                marginTop: '1vh'
            }}
            size="small"
            header={<div>Legend</div>}
            bordered
            dataSource={data}
            renderItem={item =>
                <List.Item.Meta
                    avatar={<Box key={item.color} past={true} backgroundColor={item.color}></Box>}
                    title={item.title}
                    style={{ margin: "5px" }}
                />}
        />
    );
}
export default Legend;