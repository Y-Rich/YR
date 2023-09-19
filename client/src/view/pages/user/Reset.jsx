import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Page,
  Title,
} from '../../components/Components';
import { AlertModal, ReloadModal } from '../../components/Modal';
import { validateEmail } from '../../../utils/userFunc';
import { pwcheck } from '../../../services/user';

const Reset = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    toEmail: '',
    secret: '',
  });
  const [reloadModal, setReloadModal] = useState(false);
  const [reloadModalContent, setReloadModalContent] = useState('');
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
      openReloadModal('메일함을 확인해 주세요!', true);
    } catch (error) {
      console.error('Failed to pw check:', error);
      openAlertModal('회원 확인에 실패하였습니다.', false);
    }
  };
  const openReloadModal = (content) => {
    setReloadModalContent(content);
    setReloadModal(true);
  };
  const openAlertModal = (content) => {
    setAlertModalContent(content);
    setAlertModal(true);
  };
  const closeReloadModal = () => {
    setReloadModal(false);
    setReloadModalContent('');
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
            placeholder="email@uvc.co.kr 형태의 이메일을 입력해 주세요."
          />
          <Input
            value={userInfo.toEmail}
            className="password"
            type="text"
            onChange={(e) => updateUserInfo('toEmail', e.target.value)}
            placeholder="재설정 링크를 받을 이메일을 입력해 주세요."
          />
          <Box className="password check">
            <Input
              value={userInfo.secret}
              className="password"
              type="text"
              onChange={(e) => updateUserInfo('secret', e.target.value)}
              placeholder="개인 고유 번호를 입력해 주세요."
            />
          </Box>
        </Box>
        <Button type="submit" className="submit" onClick={handleSubmit}>
          SUBMIT
        </Button>
        {reloadModal && (
          <ReloadModal
            setReloadModal={closeReloadModal}
            element={reloadModalContent}
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
