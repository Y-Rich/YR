import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Page,
  Title,
} from '../../components/Components';
import { AlertModal, RefreshModal } from '../../components/Modal';
import { validateEmail } from '../../../utils/userFunc';
import { pwcheck } from '../../../services/user';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    toEmail: '',
    secret: '',
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    const { email, toEmail, secret } = userInfo;
    if (!email || !toEmail || !secret) {
      openAlertModal('정보를 전부 입력해주세요!');
      return;
    }
    try {
      await pwcheck(email, toEmail, secret);
      openRefreshModal('메일함을 확인해 주세요!', true);
    } catch (error) {
      console.error('Failed to pw check:', error);
      openAlertModal('회원 확인에 실패하였습니다.', false);
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
      <Container className="password">
        <Title>PW Reset</Title>
        <Box className="password">
          <Input
            value={userInfo.email}
            className="password"
            type="text"
            onChange={(e) => updateUserInfo('email', e.target.value)}
            placeholder="Please enter your email@uvc.co.kr"
          />
          <Input
            value={userInfo.toEmail}
            className="password"
            type="text"
            onChange={(e) => updateUserInfo('toEmail', e.target.value)}
            placeholder="Email you want to receive a message"
          />
          <Box className="password check">
            <Input
              value={userInfo.secret}
              className="password"
              type="text"
              onChange={(e) => updateUserInfo('secret', e.target.value)}
              placeholder="Please enter recieved string"
            />
          </Box>
        </Box>
        <Button type="submit" className="submit" onClick={handleSubmit}>
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

export default Reset;
