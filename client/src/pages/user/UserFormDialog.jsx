import { Form, Input, Modal } from 'antd';
import React, { useMemo } from 'react';

function UserFormDialog({ onClose, onSave, initialValues }) {
  const [formInstance] = Form.useForm();
  const isEdit = useMemo(() => initialValues.id);

  const onOk = async () => {
    const isValid = await formInstance.validateFields();
    if (!isValid) {
      return;
    }
    onSave(formInstance.getFieldsValue(true));
  };
  return (
    <Modal
      title={`${isEdit ? '编辑' : '添加'}用户`}
      visible={true}
      onCancel={onClose}
      closable={false}
      onOk={onOk}
    >
      <Form
        form={formInstance}
        initialValues={initialValues}
        labelCol={{ span: 3 }}
      >
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: !isEdit }]}>
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item label="余额" name="balance">
          <Input allowClear suffix="元" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserFormDialog;
