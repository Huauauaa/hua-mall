import React, { useState, useEffect } from 'react';
import { Input, Table, Cascader, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import productAPI from '../../apis/product.api';
import categoryAPI from '../../apis/category.api';
import StyledHomePage from './HomePage.styled';
import cartAPI from '../../apis/cart.api';

const { Search } = Input;

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pager, setPager] = useState({ total: 0, page: 1, pageSize: 5 });
  const [search, setSearch] = useState({});
  const [category, setCategory] = useState([]);

  const fetchProduct = async (condition) => {
    try {
      setLoading(true);
      const params = { ...search, ...pager, ...condition };
      const response = await productAPI.getAll(params);
      console.log({ response });
      setSearch(params);
      const { rows, count } = response;
      setTableData(rows);
      setPager({ total: count, page: params.page, pageSize: params.pageSize });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    const id = setTimeout(() => {
      fetchProduct();
      fetchCategory();
    });
    return () => {
      clearTimeout(id);
    };
  }, []);

  const goDetailPage = (id) => () => {
    navigate(`/product/${id}`);
  };

  const addToCart = async (id) => {
    try {
      await cartAPI.add({ productId: id });
      message.success('添加成功');
    } catch (error) {
      console.error(error || '操作失败');
    }
  };

  const columns = [
    {
      title: '名称',
      render: ({ name, id }) => <a onClick={goDetailPage(id)}>{name}</a>,
    },
    {
      title: '价格',
      render: ({ price, moneyUnit, unit }) => `${price}${moneyUnit}/${unit}`,
    },
    {
      title: '操作',
      render: ({ id }) => (
        <Space>
          <a onClick={() => addToCart(id)}>加入购物车</a>
        </Space>
      ),
    },
  ];

  const onSearch = (name) => {
    fetchProduct({ name, page: 1 });
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') {
      fetchProduct({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  };
  const onCategoryChange = (args) => {
    setSearch({ ...search, categoryId: args?.[0] });
  };
  return (
    <StyledHomePage>
      <Search
        addonBefore={
          <Cascader
            placeholder="全部种类"
            style={{ width: 150 }}
            options={category}
            onChange={onCategoryChange}
          />
        }
        placeholder="按名称搜索"
        enterButton
        className="search-area"
        onSearch={onSearch}
      />
      <Table
        onChange={onChange}
        loading={loading}
        dataSource={tableData}
        rowKey="id"
        columns={columns}
        pagination={{
          position: ['bottomCenter'],
          total: pager.total,
          pageSize: pager.pageSize,
          current: pager.page,
          showTotal: (total) => `共${total}条`,
        }}
      />
    </StyledHomePage>
  );
}

export default HomePage;
