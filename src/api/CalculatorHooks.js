import axios from 'axios';

const baseURL = 'http://localhost:8080';  

const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

export const calculate = async (inputString) => {
  try {
    const response = await api.post('/calculate', { inputString });
    return response.data;
  } catch (error) {
    console.error('Error while calculating result:', error);
    throw error;
  }
};

export const calculateJSON = async (inputString) => {
    try {
        const response = await api.post('/calculate/json', { inputString });
        return response.data;
    } catch (error) {
        console.error('Error while calculating JSON:', error);
        throw error;
    }
};
