import { List, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import orderAPI from '../apis/order.api';

function OrderPage() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await orderAPI.list();
      setData(response);
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
  return (
    <List
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Space>
            <span>{item.id}.</span>
            {item.Products.map((item) => (
              <span key={item.id}>{item.name}</span>
            ))}

            <span>共计: {item.totalAmount}元</span>
            <span>{item.paid ? '已支付' : '未支付'}</span>
          </Space>
        </List.Item>
      )}
    />
  );
}

export default OrderPage;
