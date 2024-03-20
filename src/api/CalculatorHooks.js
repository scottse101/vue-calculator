import api from '@/api/axiosConfig';
import { CalculationRequest } from '@/types/CalculationRequest';

export const calculate = (equation, user) => {
  console.log(equation);
  console.log(user);
  const calculationRequest = {
    equation: equation,
    user: user
  };
  return api.post('/calculate', calculationRequest)
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
