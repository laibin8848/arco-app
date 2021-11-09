import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    config.headers['x-access-token'] = 'token';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 'E000') {
      if (res.code === 'E503' || res.code === 'E401') {
        return res;
      }
      // throw new Error(res.message);
    } else {
      return res;
    }
  }
)

export default service;
