import axios from 'axios';

export const register = async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:8081/users', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
