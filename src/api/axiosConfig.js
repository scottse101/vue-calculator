import axios from 'axios';

const baseURL = 'http://localhost:8080';  // Adjust this according to your backend API base URL

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,  // Adjust timeout as needed
});

api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;