import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Page,
  Title,
} from '../../components/Components';
import { AlertModal, RefreshModal } from '../../components/Modal';
import { pwchange } from '../../../services/user';
import { validateEmail, validatePassword } from '../../../utils/userFunc';

const Password = () => {
  const [userInfo, setUserInfo] = useState({
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
  const closeRefreshModal = () => {
    setRefreshModal(false);
    setRefreshModalContent('');
  };
  const closeAlertModal = () => {
    setAlertModal(false);
    setAlertModalContent('');
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();

    await new Promise((res) => setTimeout(res, 1000));
    const { email, password, password2 } = userInfo;
    if (!email || !password || !password2) {
      openAlertModal('정보를 전부 입력해주세요!');
      return;
    }
    console.log(63);
    if (!validateEmail(email)) {
      openAlertModal('정확한 사내 이메일을 입력해주세요');
      return;
    }
    console.log(53);
    if (!validatePassword(password)) {
      openAlertModal('8자 이상의 비밀번호를 입력해주세요!');
      return;
    }
    console.log(43);
    if (password !== password2) {
      openAlertModal('비밀번호를 재확인해주세요!');
      return;
    }
    console.log(33);
    try {
      await pwchange(email, password);
      openRefreshModal('비밀번호 재설정이 완료되었습니다.');
      console.log(23);
    } catch (error) {
      console.error('Failed to register:', error);
      openAlertModal('비밀번호 재설정에 실패하였습니다.');
    }
  };
  console.log(2);
  return (
    <Page>
      <Container className="password">
        <Title>PW Change</Title>
        <Box className="password">
          <Input
            value={userInfo.email}
            className="password"
            type="text"
            onChange={(e) => updateUserInfo('email', e.target.value)}
            placeholder="Please enter your email@uvc.co.kr"
          />
          <Input
            value={userInfo.password}
            className="password"
            type="password"
            onChange={(e) => updateUserInfo('password', e.target.value)}
            placeholder="Please enter your new password"
          />
          <Input
            value={userInfo.password2}
            className="password"
            type="password"
            onChange={(e) => updateUserInfo('password2', e.target.value)}
            placeholder="Please enter new password again"
          />
        </Box>
        <Button type="button" className="submit" onClick={handleSubmit}>
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
    </Page>
  );
};

export default Password;
