import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 60e3,
});

instance.interceptors.response.use(
  (result) => {
    const { data } = result;
    return data;
  },
  (data) => {
    const { response } = data;
    console.error(response);
    return Promise.reject(response);
  },
);

export default instance;
