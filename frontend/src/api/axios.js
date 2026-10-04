import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ignitron_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('ignitron_admin_token');
      localStorage.removeItem('ignitron_admin_user');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export const ASSET_URL = import.meta.env.VITE_ASSET_URL || 'http://localhost:5000';

// Resolve an image path returned by the API (either a full URL or a /uploads/.. relative path)
export const resolveAsset = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${ASSET_URL}${url}`;
};

export default api;
