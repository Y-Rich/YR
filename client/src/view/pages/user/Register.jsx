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
import { AlertModal, RefreshModal } from '../../components/Modal';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });
  const [refreshModal, setRefreshModal] = useState(false);
  const [refreshModalContent, setRefreshModalContent] = useState('');
  const [alertmodal, setAlertModal] = useState(false);
  const [alertmodalContent, setAlertModalContent] = useState('');

  const updateUserInfo = (fieldName, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [fieldName]: value,
    }));
  };
  const openRefreshModal = (content) => {
    setRefreshModalContent(content);
    setRefreshModal(true);
  };
  const openAlertModal = (content) => {
    setAlertModalContent(content);
    setAlertModal(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    const { name, phone, email, password, password2 } = userInfo;
    if (!name || !phone || !email || !password || !password2) {
      openAlertModal('정보를 전부 입력해주세요!');
      return;
    }

    if (!validateName(name)) {
      openAlertModal('이름을 한글로 입력해주세요');
      return;
    }
    if (!validatePhone(phone)) {
      openAlertModal('정확한 전화번호를 입력해주세요');
      return;
    }
    if (!validateEmail(email)) {
      openAlertModal('사내 이메일을 입력해주세요');
      return;
    }
    if (!validatePassword(password)) {
      openAlertModal('8자 이상의 비밀번호를 입력해주세요!');
      return;
    }
    if (password !== password2) {
      openAlertModal('비밀번호를 재확인해주세요!');
      return;
    }
    try {
      await register(name, phone, email, password);
      openRefreshModal(`${name}님의 회원가입이 완료되었습니다.`, true);
      navigate('/');
    } catch (error) {
      console.error('Failed to register:', error);
      openAlertModal('회원가입에 실패하였습니다.', false);
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
          <Box className="register check">
            <Input
              placeholder="Please enter your phone"
              value={userInfo.phone}
              onChange={(e) => updateUserInfo('phone', e.target.value)}
              className="register check"
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
        {/* {modal && <Modal setModal={closeModal} element={modalContent} />} */}
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
    </Page>
  );
};

export default Register;
