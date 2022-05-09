import React from 'react';
import { Form, Input, Button, message, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from './AuthPage.styled';
import authAPI from '../apis/auth.api';

function RegisterPage() {
  const navigate = useNavigate();

  const onRegister = async (values) => {
    try {
      await authAPI.register(values);
      message.success('注册成功');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Form layout="vertical" onFinish={onRegister}>
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input autoComplete="username" allowClear />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input.Password autoComplete="new-password" allowClear />
        </Form.Item>
        <Form.Item label="性别" name="gender" valuePropName="checked">
          <Switch checkedChildren="男" unCheckedChildren="女" />
        </Form.Item>
        <Form.Item label="电话" name="phone">
          <Input allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="actions">
            <a
              onClick={() => {
                navigate('/login');
              }}
            >
              登录
            </a>
          </div>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

export default RegisterPage;
