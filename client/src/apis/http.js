import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 60e3,
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.accessToken = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

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
