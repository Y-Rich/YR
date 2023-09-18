import React, { useState } from 'react';
import {
  Title,
  Input,
  Button,
  LinkText,
  Container,
  Box,
} from '../../components/Components';
import { validateEmail, validatePassword } from '../../../utils/userFunc';
import { info, login } from '../../../services/user';
import { AlertModal, RefreshModal } from '../../components/Modal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refreshModal, setRefreshModal] = useState(false);
  const [refreshModalContent, setRefreshModalContent] = useState('');
  const [alertmodal, setAlertModal] = useState(false);
  const [alertmodalContent, setAlertModalContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const openRefreshModal = (content) => {
    setRefreshModalContent(content);
    setRefreshModal(true);
  };
  const openAlertModal = (content) => {
    setAlertModalContent(content);
    setAlertModal(true);
  };
  const handleOnClick = async () => {
    try {
      if (!email || !password) {
        openAlertModal('이메일 또는 비밀번호를 입력해주세요!');
        return;
      }
      // if (!validatePassword(password)) {
      //   openAlertModal('비밀번호 8자리를 입력해주세요!');
      //   return;
      // }
      await login(email, password);
      openRefreshModal(`어서오세요, ${email}님!`);
    } catch (error) {
      console.error('Failed to login:', error);
      openAlertModal('로그인에 실패하였습니다.');
    }
  };
  const closeRefreshModal = () => {
    setRefreshModal(false);
    setRefreshModalContent('');
  };
  const closeAlertModal = () => {
    setAlertModal(false);
    setAlertModalContent('');
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
        <LinkText to="/password" className="smallbox">
          FIND PW
        </LinkText>
      </Box>
      <Button onClick={handleOnClick} className="submit">
        SUBMIT
      </Button>
      {refreshModal && (
        <RefreshModal
          setRefreshModal={closeRefreshModal}
          element={refreshModalContent}
        />
      )}
      {alertmodal && (
        <AlertModal
          setAlertModal={closeAlertModal}
          element={alertmodalContent}
        />
      )}
    </Container>
  );
};

export default Login;
