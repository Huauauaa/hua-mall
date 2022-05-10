import { Button, Modal, Space, Tree, message } from 'antd';
import React, { useEffect, useState } from 'react';

import CategoryFormDialog from './CategoryFormDialog';
import categoryAPI from '../../apis/category.api';

function CategoryPage() {
  const [treeData, setTreeData] = useState([]);
  const [formDialog, setFormDialog] = useState({
    visible: false,
    initialValues: {},
  });
  const fetchData = async () => {
    try {
      const response = await categoryAPI.getAll();
      setTreeData(
        response.map((item) => ({
          ...item,
          key: item.id,
          title: item.name,
          children: [],
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const id = setTimeout(() => {
      fetchData();
    });
    return () => {
      clearTimeout(id);
    };
  }, []);

  const openFormDialog = (val = {}) => {
    setFormDialog({ visible: true, initialValues: val });
  };

  const onCloseFormDialog = () => {
    setFormDialog({ visible: false, initialValues: {} });
  };
  const onSave = async (values) => {
    try {
      if (values.id) {
        await categoryAPI.update(values);
        message.success('更新成功');
      } else {
        await categoryAPI.create(values);
        message.success('创建成功');
      }
      await fetchData();
      onCloseFormDialog();
    } catch (error) {
      message.error(error || '操作失败');
    }
  };

  const onDelete = (id) => {
    Modal.confirm({
      content: '确认删除吗?',
      onOk: async () => {
        try {
          await categoryAPI.delete(id);
          message.success('删除成功');
          fetchData();
        } catch (err) {
          message.error(err || '删除失败');
        }
      },
    });
  };
  return (
    <div>
      <Button type="primary" onClick={() => openFormDialog()}>
        添加类别
      </Button>
      <Tree
        treeData={treeData}
        titleRender={(nodeData) => {
          const { id, title } = nodeData;
          return (
            <div>
              <Space>
                <span>{title}</span>
                <a onClick={() => openFormDialog(nodeData)}>编辑</a>
                <Button danger type="link" onClick={() => onDelete(id)}>
                  删除
                </Button>
              </Space>
            </div>
          );
        }}
      />
      {formDialog.visible && (
        <CategoryFormDialog
          onClose={onCloseFormDialog}
          initialValues={formDialog.initialValues}
          onSave={onSave}
        />
      )}
    </div>
  );
}

export default CategoryPage;
