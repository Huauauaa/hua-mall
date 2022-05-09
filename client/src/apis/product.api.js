import http from './http';

const productAPI = {
  getAll: (params) => http.get('/products', { params }),
  getOne: (id) => http.get(`/products/${id}`),
  create: (payload) => http.post('/products', payload),
  delete: (id) => http.delete(`/products/${id}`),
  update: (payload) => http.put(`/products/${payload.id}`, payload),
};

export default productAPI;
