import React from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import zhCN from 'antd/lib/locale/zh_CN';

import { HashRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>,
);
