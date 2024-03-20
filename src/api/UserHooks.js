import axios from 'axios';

const baseURL = 'http://localhost:8080';  

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,  
});

export const checkUsername = (username) => {
  console.log(username);
  return api.get(`/checkUsername?username=${username}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const login = (user) => {
  return api.post('/login', user)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const register = (user) => {
  return api.post('/register', user)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserByUsername = (username) => { 
  return api.get(`/user?username=${username}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserIdByUsername = (username) => {
  return api.get(`/userId?username=${username}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};