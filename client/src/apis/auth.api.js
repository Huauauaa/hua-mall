import http from './http';

const authAPI = {
  register: (payload) => http.post('/auth/register', payload),
  login: (payload) => http.post('/auth/login', payload),
  getCurrentUser: () => http.get('/auth/currentUser'),
  update: (id, payload) => http.put(`/auth/users/${id}`, payload),
  updatePassword: (id, payload) =>
    http.put(`/auth/updatePassword/${id}`, payload),
};
export default authAPI;
