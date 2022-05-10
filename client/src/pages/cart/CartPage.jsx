import { Button, Modal, Space, Table, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import PayDialog from './PayDialog';
import cartAPI from '../../apis/cart.api';
import { formatMoney } from '../../utils';
import orderAPI from '../../apis/order.api';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [payDialog, setPayDialog] = useState({ visible: false });

  const totalAmount = useMemo(() => {
    return selectedRows.reduce((result, current) => {
      result += current.price * current.Cart.count;
      return result;
    }, 0);
  });
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
      title: '合计',
      render: ({ Cart, price }) => (
        <span>{formatMoney(price * Cart.count)}元</span>
      ),
    },
    {
      title: '操作',
      render: ({ id }) => (
        <Space>
          <Button danger type="link" onClick={() => onDelete(id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const openPayDialog = () => {
    const total = selectedRows.reduce((result, current) => {
      result += current.price * current.Cart.count;
      return result;
    }, 0);
    setPayDialog({ visible: true, total });
  };
  const onPay = async () => {
    try {
      await orderAPI.add({
        productIds: selectedRows.map((item) => item.id),
        totalAmount,
      });
      message.success('购买成功');
      onClosePayDialog();
      navigate('/cart');
    } catch (error) {
      message.error(error || '操作失败');
    }
  };

  const onClosePayDialog = () => {
    setPayDialog({ visible: false, total: 0 });
  };
  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => openPayDialog()}
          disabled={selectedRows.length === 0}
        >
          结算
        </Button>
        <span>总计:{formatMoney(totalAmount)}元</span>
      </Space>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={false}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {payDialog.visible && (
        <PayDialog
          onClose={onClosePayDialog}
          total={payDialog.total}
          onOk={onPay}
        />
      )}
    </div>
  );
}

export default CartPage;
