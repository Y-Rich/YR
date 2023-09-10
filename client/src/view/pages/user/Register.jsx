import React, { useState } from 'react';
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
import Modal from '../../components/Modal';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const updateUserInfo = (fieldName, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [fieldName]: value,
    }));
  };
  const openModal = (content) => {
    setModalContent(content);
    setModal(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    const { name, phone, email, password, password2 } = userInfo;
    if (!name || !phone || !email || !password || !password2) {
      openModal('정보를 전부 입력해주세요!');
      return;
    }

    if (!validateName(name)) {
      openModal('이름을 한글로 입력해주세요');
      return;
    }
    if (!validatePhone(phone)) {
      openModal('정확한 전화번호를 입력해주세요');
      return;
    }
    if (!validateEmail(email)) {
      openModal('사내 이메일을 입력해주세요');
      return;
    }
    if (!validatePassword(password)) {
      openModal('8자 이상의 비밀번호를 입력해주세요!');
      return;
    }
    if (password !== password2) {
      openModal('비밀번호를 재확인해주세요!');
      return;
    }
    try {
      await register(name, phone, email, password);
      openModal(`${name}님의 회원가입이 완료되었습니다.`);
      navigate('/');
    } catch (error) {
      console.error('Failed to register:', error);
      openModal('회원가입에 실패하였습니다.');
    }
  };

  const closeModal = () => {
    setModal(false);
    setModalContent('');
  };
  return (
    <Page>
      <Container className="register">
        <Title className="register">REGISTER</Title>
        <Box className="register">
          <Input
            placeholder="Please enter your name"
            value={userInfo.name}
            onChange={(e) => updateUserInfo('name', e.target.value)}
            className="register"
          />
          <Box className="register phone">
            <Input
              placeholder="Please enter your phone"
              value={userInfo.phone}
              onChange={(e) => updateUserInfo('phone', e.target.value)}
              className="register phone"
            />
            <Button className="check">Check</Button>
          </Box>
          <Input
            placeholder="Please enter your email"
            value={userInfo.email}
            onChange={(e) => updateUserInfo('email', e.target.value)}
            className="register"
          />
          <Input
            type="password"
            placeholder="Please enter your password"
            value={userInfo.password}
            onChange={(e) => updateUserInfo('password', e.target.value)}
            className="register"
          />
          <Input
            type="password"
            placeholder="Please Check Your password"
            value={userInfo.password2}
            onChange={(e) => updateUserInfo('password2', e.target.value)}
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
        {modal && <Modal setModal={closeModal} element={modalContent} />}
      </Container>
    </Page>
  );
};

export default Register;
