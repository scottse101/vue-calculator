import axios from 'axios';
import { CalculationRequest } from '@/types/CalculationRequest';


const baseURL = 'http://localhost:8080';  

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export const calculate = (calculationRequest) => {
  console.log(calculationRequest.equation);
  console.log(calculationRequest.user);
  return api.post('/calculate', equation)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const calculateJSON = async (equation) => {
    try {
        const response = await api.post('/calculate/json', { equation });
        return response.data;
    } catch (error) {
        console.error('Error while calculating JSON:', error);
        throw error;
    }
};

export const getCalculationResultsByUserId = (userId, page, pageSize = 10) => {
  const url = `/calculation-results/${userId}?page=${page}&size=${pageSize}`;

  return api
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
