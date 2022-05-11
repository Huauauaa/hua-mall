import { Button, Form, Input, message } from 'antd';
import React, { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';
import { Wrapper } from './AuthPage.styled';
import authAPI from '../apis/auth.api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { fetchCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async (values) => {
    try {
      const response = await authAPI.login(values);
      message.success('登录成功');
      localStorage.setItem('accessToken', response);
      navigate('/');
      fetchCurrentUser(false);
    } catch (error) {
      console.error(error);
      message.error('账号或密码错误!');
    }
  };
  return (
    <Wrapper>
      <Form layout="vertical" onFinish={onLogin}>
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="actions">
            <a
              onClick={() => {
                navigate('/register');
              }}
            >
              创建账号
            </a>
          </div>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

export default LoginPage;
