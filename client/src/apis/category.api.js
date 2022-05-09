import http from './http';

const categoryAPI = {
  getAll: () => http.get('/categories'),
  create: (payload) => http.post('/categories', payload),
  update: (payload) => http.put(`/categories/${payload.id}`, payload),
  delete: (id) => http.delete(`/categories/${id}`),
};

export default categoryAPI;
