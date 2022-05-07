import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { StyledCommonHeader } from './Header.styled';

const { Header, Content, Footer } = Layout;

function CommonLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    { label: '首页', key: '/' },
    { label: '登录', key: '/login' },
    { label: '注册', key: '/register' },
    {
      label: '我的',
      children: [
        { label: '信息', key: '/profile' },
        { label: '购物车', key: '/cart' },
        { label: '订单', key: '/order' },
      ],
    },
    { label: '设置', key: '/setting' },
  ];
  const onMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (location.pathname === key) {
      return;
    }
    navigate(key);
  };
  return (
    <Layout>
      <StyledCommonHeader>
        <Menu
          items={items}
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={onMenuClick}
        />
      </StyledCommonHeader>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default CommonLayout;
