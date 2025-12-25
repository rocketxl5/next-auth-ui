import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // sends cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
