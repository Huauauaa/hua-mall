import { Button, Cascader, Input, Modal, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';

import ProductFormDialog from './ProductFormDialog';
import categoryAPI from '../../apis/category.api';
import productAPI from '../../apis/product.api';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

function ProductPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pager, setPager] = useState({ total: 0, page: 1, pageSize: 5 });
  const [search, setSearch] = useState({});
  const [category, setCategory] = useState([]);
  const [formDialog, setFormDialog] = useState({ visible: false });

  const fetchData = async (condition) => {
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
      fetchData();
      fetchCategory();
    });
    return () => {
      clearTimeout(id);
    };
  }, []);

  const goDetailPage = (id) => () => {
    navigate(`/product/${id}`);
  };

  const onDelete = (id) => () => {
    Modal.confirm({
      content: '确认删除吗?',
      onOk: async () => {
        try {
          await productAPI.delete(id);
          message.success('删除成功');
          fetchData({ page: 1 });
        } catch (err) {
          message.error(err || '删除失败');
        }
      },
    });
  };

  const openFormDialog = (val = {}) => {
    setFormDialog({
      visible: true,
      initialValues: {
        ...val,
        categoryIds: val.Categories?.map((item) => item.id) || [],
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '类别',
      render: ({ Categories }) =>
        Categories?.map((item) => item.name).join(' '),
    },
    {
      title: '操作',
      render: (row) => (
        <Space size="middle">
          <a onClick={onDelete(row.id)}>删除</a>
          <a onClick={() => openFormDialog(row)}>修改</a>
        </Space>
      ),
    },
  ];

  const onSearch = (name) => {
    fetchData({ name, page: 1 });
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') {
      fetchData({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  };
  const onCategoryChange = (args) => {
    setSearch({ ...search, categoryId: args?.[0] });
  };

  const onCloseFormDialog = () => {
    setFormDialog({ visible: false, initialValues: {} });
  };

  const onSaveProduct = async (values) => {
    try {
      if (values.id) {
        await productAPI.update(values);
        message.success('更新成功');
      } else {
        await productAPI.create(values);
        message.success('添加成功');
      }

      await fetchData({ page: 1 });

      onCloseFormDialog();
    } catch (error) {
      message.error(error || '添加失败');
    }
  };
  return (
    <div>
      <div>
        <Button type="primary" onClick={() => openFormDialog()}>
          添加商品
        </Button>
      </div>
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
      {formDialog.visible && (
        <ProductFormDialog
          onClose={onCloseFormDialog}
          onSave={onSaveProduct}
          initialValues={formDialog.initialValues}
        />
      )}
    </div>
  );
}

export default ProductPage;
