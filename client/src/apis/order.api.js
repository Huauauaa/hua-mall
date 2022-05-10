import http from './http';

const orderAPI = {
  list: () => http.get('/orders'),
  add: (payload) => http.post('/orders', payload),
  delete: (id) => http.delete(`/orders/${id}`),
};
export default orderAPI;
