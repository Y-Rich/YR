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
import { AlertModal, RefreshModal } from '../../components/Modal';

const UserModi = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
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
  useEffect(() => {
    try {
      info().then((res) => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          name: res.name,
          email: res.email,
          phone: res.phone,
        }));
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
      openAlertModal('정보를 전부 입력해주세요!');
      return;
    }
    if (!validateName(name)) {
      openAlertModal('이름을 한글로 입력해주세요');
      return;
    }
    if (!validatePhone(phone)) {
      openAlertModal('정확한 핸드폰 번호를 입력해주세요');
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
      await modi(name, phone, password);
      openRefreshModal('회원 수정이 완료되었습니다.');
      // window.location.reload('/usermodi');
    } catch (error) {
      console.error('Failed to register:', error);
      openAlertModal('회원 수정에 실패하였습니다.');
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
      <Container className="modi">
        <Title className="modi">USER MODIFY</Title>
        <Box className="modi">
          <Input
            value={userInfo.name}
            onChange={(e) => updateUserInfo('name', e.target.value)}
            className="modi"
            placeholder="이름을 입력해 주세요."
          ></Input>
          <Input
            value={userInfo.email}
            className="modi"
            placeholder="이메일은 변경할 수 없습니다."
            disabled
            style={{ backgroundColor: '#d9d9c0' }}
          />
          <Input
            placeholder="전화번호를 입력해 주세요."
            value={userInfo.phone}
            onChange={(e) => updateUserInfo('phone', e.target.value)}
            className="modi"
          />
          <Input
            type="password"
            value={userInfo.password}
            className="modi"
            onChange={(e) => updateUserInfo('password', e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
          />
          <Input
            type="password"
            value={userInfo.password2}
            className="modi"
            onChange={(e) => updateUserInfo('password2', e.target.value)}
            placeholder="비밀번호를 다시 한 번 입력해 주세요."
          ></Input>
        </Box>
        <Button className="submit" onClick={handleSubmit}>
          Submit
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

export default UserModi;
