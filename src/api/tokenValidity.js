import api from '@/api/axiosConfig';
import { getUserByUsername } from './UserHooks';

let tokenExpiryTimer;

const isTokenExpired = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return true;
  const expiryTime = JSON.parse(atob(token.split('.')[1])).exp * 1000;
  return Date.now() >= expiryTime;
};

const renewToken = async () => {
  try {
    const userData = getUserByUsername(localStorage.getItem('username'));
    const user = {
      userData,
    };
    const response = await api.post('/token', user);
    const token = response.data;
    sessionStorage.setItem('token', token);
    scheduleTokenExpiryCheck();
  } catch (error) {
    console.error('Error renewing token:', error);
  }
};

const scheduleTokenExpiryCheck = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const expiryTime = JSON.parse(atob(token.split('.')[1])).exp * 1000;
    const timeUntilExpiry = expiryTime - Date.now();
    tokenExpiryTimer = setTimeout(renewToken, timeUntilExpiry);
  }
};

api.interceptors.request.use(
  async config => {
    if (isTokenExpired()) {
      await renewToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
scheduleTokenExpiryCheck();

export default api;