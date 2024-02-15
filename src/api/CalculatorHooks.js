import axios from 'axios';

const baseURL = 'http://localhost:8080';  

const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

export const calculate = (equation) => {
  return api.post('/calculate', equation)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const calculateJSON = async (expression) => {
    try {
        const response = await api.post('/calculate/json', { expression });
        return response.data;
    } catch (error) {
        console.error('Error while calculating JSON:', error);
        throw error;
    }
};
