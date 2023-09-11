import axios from 'axios';

export const register = async (name, phone, email, password) => {
  try {
    const response = await axios.post(
      'http://192.168.0.127:8000/users/register',
      {
        name,
        email,
        phone,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const login = async (email, password) => {
  try {
    const response = await axios.post('http://192.168.0.127:8000/users/login', {
      email,
      password,
    });
    console.log(response.data);
    if (response.status === 200) {
      const headerValue = response.headers.accesstoken;
      sessionStorage.setItem('employeeID', response.data.employeeID);
      sessionStorage.setItem('token', headerValue);
    }
    // else {
    // alert('로그인 실패');
    // }
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
export const modi = async (name, phone, password) => {
  try {
    const employeeID = sessionStorage.getItem('employeeID');
    const response = await axios.put(
      `http://192.168.0.127:8000/users/profile/${employeeID}`,
      {
        name,
        phone,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};
export const info = async () => {
  try {
    const employeeID = sessionStorage.getItem('employeeID');
    const res = await axios.get(
      `http://192.168.0.127:8000/users/profile/${employeeID}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to info:', error);
    throw error;
  }
};
export const logout = async () => {
  try {
    const res = await axios.get(`http://192.168.0.127:8000/users/logout`);
    return res.data;
  } catch (error) {
    console.error('Failed to logout:', error);
    throw error;
  }
};
