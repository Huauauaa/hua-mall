import { Modal, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';

import cartAPI from '../apis/cart.api';

function CartPage() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      const response = await cartAPI.getProduct();
      setProducts(response);
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

  const onDelete = async (id) => {
    Modal.confirm({
      content: '确认删除吗?',
      onOk: async () => {
        try {
          await cartAPI.delete(id);
          message.success('删除成功');
          fetchData();
        } catch (error) {
          console.error(error || '操作失败');
        }
      },
    });
  };

  const onUpdate = async (productId, count) => {
    try {
      await cartAPI.update({ productId, count });
      message.success('操作成功');
      await fetchData();
    } catch (error) {
      console.error(error);
      message.error(error || '操作失败');
    }
  };
  const columns = [
    { title: '商品名称', dataIndex: 'name' },
    {
      title: '数量',
      render: ({ Cart, unit, id }) => (
        <Space>
          <a
            onClick={() => onUpdate(id, Cart.count - 1)}
            disabled={Cart.count === 1}
          >
            -
          </a>
          {Cart.count}
          {unit}
          <a onClick={() => onUpdate(id, Cart.count + 1)}>+</a>
        </Space>
      ),
    },
    {
      title: '操作',
      render: ({ id }) => (
        <Space>
          <a onClick={() => onDelete(id)}>删除</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey='id'
        pagination={false}
      />
    </div>
  );
}

export default CartPage;
