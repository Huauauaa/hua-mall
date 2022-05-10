import http from './http';

const authAPI = {
  register: (payload) => http.post('/auth/register', payload),
  create: (payload) => http.post('/auth/users', payload),
  login: (payload) => http.post('/auth/login', payload),
  getCurrentUser: () => http.get('/auth/currentUser'),
  update: (id, payload) => http.put(`/auth/users/${id}`, payload),
  updatePassword: (id, payload) =>
    http.put(`/auth/updatePassword/${id}`, payload),
  list: (params) => http.get('/auth/users', { params }),
  delete: (id) => http.delete(`/auth/users/${id}`),
};
export default authAPI;
