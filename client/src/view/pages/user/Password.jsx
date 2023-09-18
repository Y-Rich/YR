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

const Password = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    string: '',
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
  return (
    <Page>
      <Container className="password">
        <Title>PW Reset</Title>
        <Box className="password">
          <Input
            value={userInfo.email}
            className="password"
            type="text"
            placeholder="Please enter your email"
          />
          <Box className="password check">
            <Input
              value={userInfo.string}
              className="password check"
              type="text"
              placeholder="Please enter recieved string"
            />
            <Button className="check">Check</Button>
          </Box>

          <Input
            value={userInfo.password}
            className="password"
            type="password"
            placeholder="Please enter your new password"
          />
          <Input
            value={userInfo.password2}
            className="password"
            type="password"
            placeholder="Please enter new password again"
          />
        </Box>
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
        <Button className="submit">SUBMIT</Button>
      </Container>
    </Page>
  );
};

export default Password;
