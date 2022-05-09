import http from './http';

const cartAPI = {
  getProduct: () => http.get('/cart'),
  add: (payload) => http.post('/cart', payload),
  delete: (id) => http.delete(`/cart/${id}`),
  update: (payload) => http.put('/cart', payload),
};
export default cartAPI;
