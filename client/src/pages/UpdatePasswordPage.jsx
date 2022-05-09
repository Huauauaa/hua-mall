import { useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import authAPI from '../apis/auth.api';
import StyledUpdatePasswordPage from './UpdatePasswordPage.styled';

function UpdatePasswordPage() {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const onUpdatePassword = async (values) => {
    try {
      await authAPI.updatePassword(authState.user.id, values);
      message.success('更新成功,请重新登录');
      logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <StyledUpdatePasswordPage>
      <Form labelCol={{ span: 10 }} onFinish={onUpdatePassword}>
        <Form.Item label="原密码" name="password" rules={[{ required: true }]}>
          <Input.Password autoComplete="new-password" allowClear />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('password') === value) {
                  return Promise.reject(new Error('新旧密码不能相同'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" allowClear />
        </Form.Item>
        <Form.Item
          label="再次输入新密码"
          name="newPasswordAgain"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('两次填写的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            更新密码
          </Button>
        </Form.Item>
      </Form>
    </StyledUpdatePasswordPage>
  );
}

export default UpdatePasswordPage;
