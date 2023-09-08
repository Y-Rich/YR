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
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleOnClick = async () => {
    try {
      if (!email || !password) {
        alert('이메일 또는 비밀번호를 입력해주세요!');
        return;
      }
      if (!validateEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요!');
        return;
      }
      login(email, password);
    } catch (error) {
      console.error('Failed to login:', error);
      alert('로그인에 실패하였습니다.');
    }
  };
  return (
    <Container className="login">
      <Title className="login">LOGIN</Title>
      <Box className="login">
        <Input
          type="text"
          name="email"
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
        <LinkText to="/find" className="smallbox">
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
