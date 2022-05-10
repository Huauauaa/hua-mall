import { Form, Input, Modal, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';

import categoryAPI from '../../apis/category.api';

function ProductFormDialog({ onClose, onSave, initialValues }) {
  const [formInstance] = Form.useForm();
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategory(
        response.map((item) => ({ value: item.id, label: item.name })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
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
      <Form
        form={formInstance}
        initialValues={initialValues}
        labelCol={{ span: 3 }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="价格" name="price" rules={[{ required: true }]}>
          <Input allowClear suffix="元" />
        </Form.Item>
        {category.length > 0 && (
          <Form.Item label="类别" name="categoryIds">
            <TreeSelect treeData={category} treeCheckable />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default ProductFormDialog;
