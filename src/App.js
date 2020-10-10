import './App.less';

import React from 'react';
import { Layout, Typography, Space, PageHeader } from 'antd';

import Filters from './components/Filters';
import Calendar from './components/Calendar';
import Legend from './components/Legend';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Header>
        <Title style={{
          color: 'white'
        }}>Life Calendar</Title>
      </Header>
      <Layout>
        <Sider
          // theme="light" 
          style={{
            paddingLeft: '0.5vw',
            paddingRight: '0.5vw'
          }}>
          <Filters />
          <Legend />
        </Sider>
        <Content>
          <Calendar></Calendar>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </div>
);

export default App;