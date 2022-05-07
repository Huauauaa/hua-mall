import http from './http';

const categoryAPI = {
  getAll: () => http.get('/categories'),
};

export default categoryAPI;
