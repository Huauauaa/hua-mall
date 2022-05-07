import { Descriptions, PageHeader } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectAPI from '../../apis/product.api';
import StyledProductDetail from './ProductDetail.styled';

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  const fetchData = async () => {
    try {
      const response = await projectAPI.getOne(id);
      setDetail(response);
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

  const onBack = () => {
    navigate('/');
  };

  return (
    <StyledProductDetail>
      <PageHeader onBack={onBack} title="返回首页" />
      <Descriptions column={2}>
        <Descriptions.Item label="名称">{detail.name}</Descriptions.Item>
        <Descriptions.Item label="描述">{detail.description}</Descriptions.Item>
        <Descriptions.Item label="价格">
          {detail.price}
          {detail.moneyUnit}/{detail.unit}
        </Descriptions.Item>
        <Descriptions label="库存">
          {detail.stock}
          {detail.unit}
        </Descriptions>
      </Descriptions>
    </StyledProductDetail>
  );
}

export default ProductDetail;
