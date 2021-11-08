import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 30000,
});

export default service;
