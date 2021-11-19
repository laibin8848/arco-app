import axios from 'axios';
import { Notification } from '@arco-design/web-react';
import history from '../history';

const service = axios.create({
  baseURL: '',
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    config.headers['x-access-token'] = localStorage.getItem('token') || '';
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
        localStorage.removeItem('token');
        localStorage.removeItem('loginUserId');
        Notification.error({ title: '错误', content: res.message });
        setTimeout(()=> {
          history.push('/user/login');
          return res;
        }, 3000)
      }
      Notification.error({ title: '错误', content: res.message });
      throw new Error(res.message);
    } else {
      return res;
    }
  }
)

export default service;
