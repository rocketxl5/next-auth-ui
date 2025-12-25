import api from './axios';

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      window.location.href = `/signin?from=${encodeURIComponent(currentPath)}`;
    }

    return Promise.reject(error);
  }
);
