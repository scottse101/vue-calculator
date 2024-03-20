import api from '@/api/axiosConfig';

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

export const login = async (user) => {
  try {
    const response = await api.post('/token', user);
    const token = response.data;

    sessionStorage.setItem('token', token);

    return {
      success: true,
      data: token
    };
  } catch (error) {
    return {
      success: false,
      error: error
    };
  }
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

export const getPasswordByUsername = (username) => {
  return api.get(`/password?username=${username}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};