import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Title,
  Box,
  Container,
  Page,
} from '../../components/Components';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
} from '../../../utils/userFunc';
import { register } from '../../../services/user';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const nameChange = ({ target: { value } }) => setName(value);
  const phoneChange = ({ target: { value } }) => setPhone(value);
  const emailChange = ({ target: { value } }) => setEmail(value);
  const passwordChange = ({ target: { value } }) => setPassword(value);
  const password2Change = ({ target: { value } }) => setPassword2(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    if (!name || !phone || !email || !password || !password2) {
      alert('정보를 전부 입력해주세요!');
      return;
    }

    if (!validateName(name)) {
      alert('이름을 한글로 입력해주세요');
      return;
    }
    if (!validatePhone(phone)) {
      alert('정확한 사번을 입력해주세요');
      return;
    }
    if (!validateEmail(email)) {
      alert('사내 이메일을 입력해주세요');
      return;
    }
    if (!validatePassword(password)) {
      alert('8자 이상의 비밀번호를 입력해주세요!');
      return;
    }
    if (password !== password2) {
      alert('비밀번호를 재확인해주세요!');
      return;
    }
    try {
      await register(name, phone, email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('Failed to register:', error);
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <Page>
      <Container className="register">
        <Title className="register">REGISTER</Title>
        <Box className="register">
          <Input
            placeholder="Please enter your name"
            value={name}
            onChange={nameChange}
            className="register"
          />
          <Box className="register phone">
            <Input
              placeholder="Please enter your phone"
              value={phone}
              onChange={phoneChange}
              className="register phone"
            />
            <Button className="check">Check</Button>
          </Box>
          <Input
            placeholder="Please enter your email"
            value={email}
            onChange={emailChange}
            className="register"
          />
          <Input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={passwordChange}
            className="register"
          />
          <Input
            type="password"
            placeholder="Please Check Your password"
            value={password2}
            onChange={password2Change}
            className="register"
          />
        </Box>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="submit register"
        >
          SUBMIT
        </Button>
      </Container>
    </Page>
  );
};

export default Register;
