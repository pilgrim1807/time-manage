import axios from 'axios';

// функция для логина
export const loginUser = async (email, password) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  return response.data;
};

// функция для регистрации
export const registerUser = async (email, password) => {
  const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
  return response.data;
};
