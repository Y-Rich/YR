import React, { useState } from 'react';
import axios from 'axios';
import {
  Title,
  Input,
  Button,
  LinkText,
  Container,
  Box,
} from '../../components/Components';
import { validateEmail, validatePassword } from '../../../utils/userFunc';
import { login } from '../../../services/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleOnClick = async () => {
    try {
      // if (!email || !password) {
      //   alert('이메일과 비밀번호를 입력해주세요!');
      //   return;
      // }
      // if (!validateEmail(email)) {
      //   alert('유효한 이메일 주소를 입력해주세요!');
      //   return;
      // }
      // if (!validatePassword(password)) {
      //   alert('비밀번호는 최소 8자 이상이어야 합니다!');
      //   return;
      // }
      const data = { userid: email, password: password };
      const res = await axios.post(
        'http://192.168.0.127:8000/users/login',
        data
      );
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
  return (
    <Container className="login">
      <Title className="login">LOGIN</Title>
      <Box className="login">
        <Input
          type="text"
          name="id"
          onChange={handleChange}
          placeholder="Please enter your email"
          className="login"
        />
        <Input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Please enter your password"
          className="login"
        />
      </Box>
      <Box className="small">
        <LinkText to="/register" className="smallbox">
          SIGN IN
        </LinkText>
        <LinkText to="/findpassword" className="smallbox">
          FIND PW
        </LinkText>
      </Box>
      <Button onClick={handleOnClick} className="submit">
        SUBMIT
      </Button>
    </Container>
  );
};

export default Login;
