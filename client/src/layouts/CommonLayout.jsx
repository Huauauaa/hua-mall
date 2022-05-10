import { Dropdown, Menu, Space } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import {
  StyledCommonContent,
  StyledCommonHeader,
  StyledCommonLayout,
} from './CommonLayout.styled';

import AuthContext from '../contexts/AuthContext';

function CommonLayout() {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    { label: '首页', key: '/' },
    { label: '登录', key: '/login', disabled: authState.status },
    { label: '注册', key: '/register', disabled: authState.status },
    {
      label: '商品管理',
      key: '/product',
      disabled: !(authState.status && authState.user?.username === 'admin'),
    },
    {
      label: '商品类别管理',
      key: '/category',
      disabled: !(authState.status && authState.user?.username === 'admin'),
    },
    {
      label: '用户管理',
      key: '/user',
      disabled: !(authState.status && authState.user?.username === 'admin'),
    },
  ];

  const onMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (location.pathname === key) {
      return;
    }
    if (key === 'logout') {
      logout();
      return navigate('/');
    }
    navigate(key);
  };

  const profileMenu = (
    <Menu
      theme="light"
      items={[
        { label: '个人信息', key: '/profile' },
        { label: '购物车', key: '/cart' },
        { label: '订单', key: '/order' },
        { label: '修改密码', key: '/updatePassword' },
        { label: '登出', key: 'logout' },
      ]}
      onClick={onMenuClick}
    />
  );

  return (
    <StyledCommonLayout>
      <StyledCommonHeader>
        <Menu
          items={items}
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={onMenuClick}
        />
        {authState.status && (
          <Dropdown
            overlay={profileMenu}
            className="profile"
            trigger={['click']}
          >
            <Space>{authState.user?.username}</Space>
          </Dropdown>
        )}
      </StyledCommonHeader>
      <StyledCommonContent>
        <Outlet />
      </StyledCommonContent>
    </StyledCommonLayout>
  );
}

export default CommonLayout;
