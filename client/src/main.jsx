import 'antd/dist/antd.less';

import App from './App';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={zhCN} input={{ autoComplete: 'new-password' }}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>,
);
