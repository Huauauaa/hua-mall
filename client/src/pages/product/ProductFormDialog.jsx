import { Form, Modal, Input } from 'antd';
import React from 'react';

function ProductFormDialog({ onClose, onSave, initialValues }) {
  const [formInstance] = Form.useForm();
  const onOk = async () => {
    const isValid = await formInstance.validateFields();
    if (!isValid) {
      return;
    }
    onSave(formInstance.getFieldsValue(true));
  };
  return (
    <Modal
      title={`${initialValues.id ? '编辑' : '添加'}商品`}
      visible={true}
      onCancel={onClose}
      closable={false}
      onOk={onOk}
    >
      <Form form={formInstance} initialValues={initialValues}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProductFormDialog;
