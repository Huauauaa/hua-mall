import 'antd/dist/antd.less';

import App from './App';
import { ConfigProvider } from 'antd';
import GlobalStyles from './assets/styles/GlobalStyles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../config/theme';
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    locale={zhCN}
    input={{
      autoComplete: 'new-password',
      autoInsertSpaceInButton: false,
      componentSize: 'small',
    }}
  >
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Router>
  </ConfigProvider>,
);
