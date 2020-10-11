import './App.less';

import React from 'react';
import { Layout, Row, Col, Space, Typography, Form, Button } from 'antd';
import * as dayjs from 'dayjs';

import Filters from './components/Filters';
import Calendar from './components/Calendar';
import Legend from './components/Legend';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);
const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const birthDate = dayjs('1998-08-09');

const weeksFromBirth = dayjs().diff(birthDate, 'week');

console.log(weeksFromBirth);

const App = () => {
  const [form] = Form.useForm();
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Sider
            // theme="light" 
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              paddingLeft: '0.5vw',
              paddingRight: '0.5vw'
            }}>
            <Title style={{
              color: 'white'
            }}>Mortality Calendar</Title>
            <Filters form={form} />
            <Legend />

          </Sider>
          <Content style={{
            marginLeft: '200px',
            marginRight: '200px',
          }}>
            <Calendar></Calendar>
          </Content>
          <Sider
            // theme="light" 
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              right: 0,
              paddingLeft: '0.5vw',
              paddingRight: '0.5vw'
            }}>
            <Space direction='vertical' size="middle">
              <Row gutter={[0, 10]}>
                <Col><Text>You are <strong style={{ color: "#eb2f96" }}>{weeksFromBirth.toFixed()}</strong> weeks old</Text>
                </Col>
                <Col><Text>Assuming you live till <strong style={{ color: "#eb2f96" }}>81</strong> years old, You have <strong style={{ color: "#eb2f96" }}>{3430}</strong> more weeks to live</Text>
                </Col>
                <Col><Text>Assuming you sleep <strong style={{ color: "#eb2f96" }}>7</strong> hours/night, you'll be awake 12 hours/day</Text>
                </Col>
                <Col><Text>Assuming you work 5 days/week, 8 hours/day, <strong style={{ color: "#eb2f96" }}>81</strong> years old, You have <strong style={{ color: "#eb2f96" }}>{3430}</strong> more weeks to live</Text>
                </Col>
                <Col><Button type="primary">
                  Login
                      </Button>
                </Col>
              </Row>
            </Space>
            <Text style={{ fontStyle: "italic" }}>“If you live each day as if it were your last, someday you'll be right. Every morning I looked in the mirror and asked myself: If today were the last day of my life, would I want to do what I do today? ”</Text>

            <Col><Button style={{ backgroundColor: 'orange', color: 'black', marginTop: '40vh' }}>
              Donate Bitcoin
                      </Button>
            </Col>
          </Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div >
  )
};

export default App;