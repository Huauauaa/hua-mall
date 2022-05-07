import http from './http';

const productAPI = {
  getAll: (params) => http.get('/products', { params }),
  getOne: (id) => http.get(`/products/${id}`),
};

export default productAPI;
