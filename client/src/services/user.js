import axios from 'axios';

export const register = async (name, number, userid, password) => {
  try {
    const response = await axios.post('http://192.168.0.127:8000/users', {
      name,
      number,
      userid,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
export const login = async (data) => {
  try {
    const res = await axios.post('http://192.168.0.127:8000/users/login', data);
    if (res.status === 200) {
      console.log(res);
      const headerValue = res.headers.accesstoken;
      sessionStorage.setItem('token', headerValue);
      alert('로그인 성공');
      window.location.href = '/';
    } else {
      alert('로그인 실패');
    }
  } catch (error) {
    console.error('Failed to login:', error);
    alert('로그인 실패!');
  }
};
