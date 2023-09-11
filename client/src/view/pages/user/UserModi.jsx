import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Page,
  Title,
} from '../../components/Components';
import {
  validateName,
  validatePassword,
  validatePhone,
} from '../../../utils/userFunc';
import { info, modi } from '../../../services/user';
import axios from 'axios';

const UserModi = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
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
  useEffect(() => {
    try {
      info().then((res) => {
        userInfo.name(res.name);
        userInfo.email(res.email);
        userInfo.phone(res.phone);
      });
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    const { name, phone, password, password2 } = userInfo;
    if (!name || !phone) {
      openModal('정보를 전부 입력해주세요!');
      return;
    }
    if (!validateName(name)) {
      openModal('이름을 한글로 입력해주세요');
      return;
    }
    if (!validatePhone(phone)) {
      openModal('정확한 핸드폰 번호를 입력해주세요');
      return;
    }
    if (password.length > 0 || password2.length > 0) {
      if (!validatePassword(password)) {
        openModal('8자 이상의 비밀번호를 입력해주세요!');
        return;
      }
      return;
    }
    if (password !== password2) {
      openModal('비밀번호를 재확인해주세요!');
      return;
    }
    try {
      await modi(name, phone, password);
      openModal('회원 수정이 완료되었습니다.');
      window.location.reload('/usermodi');
    } catch (error) {
      console.error('Failed to register:', error);
      openModal('회원 수정에 실패하였습니다.');
    }
  };
  return (
    <Page>
      <Container className="modi">
        <Title className="modi">USER MODIFY</Title>
        <Box className="modi">
          <Input
            value={userInfo.name}
            onChange={(e) => updateUserInfo('name', e.target.value)}
            className="modi"
            placeholder="Please enter your name"
          ></Input>
          <Input
            value={userInfo.email}
            className="modi"
            placeholder="Cannot Change Your Email"
            disabled
            style={{ backgroundColor: '#d9d9c0' }}
          />
          <Input
            placeholder="Please enter your phone"
            value={userInfo.phone}
            onChange={(e) => updateUserInfo('phone', e.target.value)}
            className="modi"
          />
          <Input
            type="password"
            value={userInfo.password}
            className="modi"
            onChange={(e) => updateUserInfo('password', e.target.value)}
            placeholder="Please enter your password"
          />
          <Input
            type="password"
            value={userInfo.password2}
            className="modi"
            onChange={(e) => updateUserInfo('password2', e.target.value)}
            placeholder="Check your password"
          ></Input>
        </Box>
        <Button className="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
    </Page>
  );
};

export default UserModi;
