import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Email, RegisterBox, RegisterContainer } from './style';
import {
  Button,
  Input,
  Title,
  Box,
  Container,
} from '../../components/Components';
import {
  validateNickname,
  validateEmail,
  validatePassword,
  validateNumber,
} from '../../../utils/userFunc';
import { register } from '../../../services/user';

const Register = () => {
  const navigate = useNavigate();
  const [departmentCode, setDepartmentCode] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const departmentCodeChange = ({ target: { value } }) =>
    setDepartmentCode(value);
  const nameChange = ({ target: { value } }) => setName(value);
  const numberChange = ({ target: { value } }) => setNumber(value);
  const emailChange = ({ target: { value } }) => setEmail(value);
  const passwordChange = ({ target: { value } }) => setPassword(value);
  const password2Change = ({ target: { value } }) => setPassword2(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    if (!name || !number || !email || !password || !password2) {
      alert('정보를 전부 입력해주세요!');
      return;
    }

    if (!validateNickname(name)) {
      alert('이름을 한글로 입력해주세요');
      return;
    }
    if (!validateNumber(number)) {
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
      // await register(name, number, email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Failed to register:', error);
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <Container className="register">
      <Title className="register">REGISTER</Title>
      <Box className="register">
        <Input
          placeholder="Please enter your departmentCode"
          value={departmentCode}
          onChange={departmentCodeChange}
          className="register"
        />
        <Input
          placeholder="Please enter your name"
          value={name}
          onChange={nameChange}
          className="register"
        />
        <Box className="number">
          <Input
            placeholder="Please enter your number"
            value={number}
            onChange={numberChange}
            className="register"
          />
          <Button style={{ width: '10vw' }} className="check">
            Check
          </Button>
        </Box>
        <Input
          placeholder="Please enter your email"
          value={email}
          onChange={emailChange}
          className="register"
        />
        {/* <Email>@uvc.co.kr</Email> */}
        {/* <SmallBox> */}
        <Input
          placeholder="Please enter your password"
          value={password}
          onChange={passwordChange}
          className="register"
        />
        <Input
          placeholder="Please Check Your password"
          value={password2}
          onChange={password2Change}
          className="register"
        />
      </Box>
      <Button type="submit" onClick={handleSubmit} className="submit">
        SUBMIT
      </Button>
    </Container>
  );
};

export default Register;
