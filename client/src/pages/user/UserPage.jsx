import { Button, Modal, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatDateTime, formatMoney } from '../../utils';

import UserFormDialog from './UserFormDialog';
import authAPI from '../../apis/auth.api';

function UserPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formDialog, setFormDialog] = useState({
    visible: false,
    initialValues: {},
  });
  const [pager, setPager] = useState({ page: 1, pageSize: 5, total: 0 });
  const fetchData = async ({ page = 1 } = {}) => {
    try {
      setLoading(true);
      const params = { ...pager, page };
      const { rows, count } = await authAPI.list(params);
      setData(rows);
      setPager((pager) => ({ ...pager, total: count, page }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const onDelete = async (id) => {
    Modal.confirm({
      content: '确认删除吗?',
      onOk: async () => {
        try {
          await authAPI.delete(id);
          message.success('删除成功');
          fetchData();
        } catch (error) {
          console.error(error || '操作失败');
        }
      },
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 50, fixed: true },
    { title: '用户名', dataIndex: 'username', width: 200 },
    {
      title: '余额',
      render: ({ balance }) => `${formatMoney(balance)}元`,
      width: 100,
    },
    { title: '电话', dataIndex: 'phone', width: 160 },
    {
      title: '创建时间',
      render: ({ createAt }) => formatDateTime(createAt),
      width: 180,
    },
    {
      title: '更新时间',
      render: ({ updatedAt }) => formatDateTime(updatedAt),
      width: 180,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 160,
      render: (row) => (
        <Space>
          <Button
            danger
            type="link"
            onClick={() => onDelete(row.id)}
            disabled={row.username === 'admin'}
          >
            删除
          </Button>
          <a onClick={() => openFormDialog(row)}>编辑</a>
        </Space>
      ),
    },
  ];

  const closeFormDialog = () => {
    setFormDialog({ visible: false, initialValues: {} });
  };
  const onSave = async (values) => {
    const { id, ...other } = values;
    try {
      if (id) {
        await authAPI.update(id, other);
        message.success('更新成功');
      } else {
        await authAPI.create(values);
        message.success('创建成功');
      }
      fetchData();
      closeFormDialog();
    } catch (error) {
      message.error(error || '操作失败');
    }
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') {
      fetchData({
        page: pagination.current,
      });
    }
  };
  return (
    <>
      <div>
        <Button type="primary" onClick={() => openFormDialog()}>
          添加用户
        </Button>
        <Table
          rowKey="id"
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            total: pager.total,
            current: pager.page,
            pageSize: pager.pageSize,
            showTotal: (total) => `共${total}条`,
          }}
          onChange={onTableChange}
          scroll={{ x: 1000 }}
        />
      </div>
      {formDialog.visible && (
        <UserFormDialog
          onClose={closeFormDialog}
          initialValues={formDialog.initialValues}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default UserPage;
