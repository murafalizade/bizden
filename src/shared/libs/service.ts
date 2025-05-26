import axios from 'axios';
import { BASE_API_URL } from '@/shared/constants';
import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';

const api = axios.create({
  baseURL: BASE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await ClientCookieManager.getCookie();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch {
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage: string = error.response?.data?.message;

    return Promise.reject(errorMessage);
  }
);

export default api;
