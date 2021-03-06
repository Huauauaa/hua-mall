import { Cascader, Divider, Input, List, Space, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import StyledHomePage from './HomePage.styled';
import cartAPI from '../../apis/cart.api';
import categoryAPI from '../../apis/category.api';
import productAPI from '../../apis/product.api';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pager, setPager] = useState({ total: 0, page: 1, pageSize: 10 });
  const [search, setSearch] = useState({});
  const [category, setCategory] = useState([]);

  const fetchProduct = async (condition, isFinite) => {
    try {
      setLoading(true);
      const params = { ...search, ...pager, ...condition };
      const response = await productAPI.getAll(params);
      setSearch(params);
      const { rows, count } = response;
      if (isFinite) {
        setData([...data, ...rows]);
      } else {
        setData(rows);
      }

      setPager({ total: count, page: params.page, pageSize: params.pageSize });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    fetchProduct({ page: pager.page + 1 }, true);
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
      message.success('????????????');
    } catch (error) {
      console.error(error || '????????????');
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

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
            placeholder="????????????"
            style={{ width: 150 }}
            options={category}
            onChange={onCategoryChange}
          />
        }
        placeholder="???????????????"
        enterButton
        className="search-area"
        onSearch={onSearch}
      />
      <div
        id="scrollableDiv"
        style={{
          height: 500,
          overflow: 'auto',
          padding: '0 16px',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < pager.total}
          loader={<Spin spinning={true} />}
          endMessage={<Divider plain>????????????????????? ????</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={({ id, name, price, moneyUnit, unit, Category }) => (
              <List.Item key={id}>
                <List.Item.Meta
                  title={<a onClick={goDetailPage(id)}>{name}</a>}
                  description={
                    <Space>
                      {`${price}${moneyUnit}/${unit}`}
                      {Category?.name}
                    </Space>
                  }
                />
                <Space>
                  <a onClick={() => addToCart(id)}>???????????????</a>
                </Space>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </StyledHomePage>
  );
}

export default HomePage;
