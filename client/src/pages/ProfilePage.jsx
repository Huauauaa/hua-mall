import { Button, Form, Input, Switch, message } from 'antd';
import React, { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';
import StyledProfilePage from './ProfilePage.styled';
import authAPI from '../apis/auth.api';
import { formatMoney } from '../utils';
import { useState } from 'react';

function ProfilePage() {
  const { authState, fetchCurrentUser } = useContext(AuthContext);
  const [formInstance] = Form.useForm();
  const [action, setAction] = useState('view');

  const onSave = async () => {
    const isValid = await formInstance.validateFields();
    if (!isValid) {
      return;
    }
    const values = formInstance.getFieldsValue(true);
    try {
      await authAPI.update(authState.user.id, values);
      await fetchCurrentUser(false);
      message.success('修改成功');
      setAction('view');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledProfilePage>
      {authState.user && (
        <Form
          form={formInstance}
          initialValues={authState.user}
          labelCol={{ span: 4 }}
          onFinish={onSave}
        >
          <Form.Item label="性别" name="gender" valuePropName="checked">
            <Switch checkedChildren="男" unCheckedChildren="女" />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="余额">
            {formatMoney(authState.user.balance)}元
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              更新信息
            </Button>
          </Form.Item>
        </Form>
      )}
    </StyledProfilePage>
  );
}

export default ProfilePage;
