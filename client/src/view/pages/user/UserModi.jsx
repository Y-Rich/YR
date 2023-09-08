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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const nameChange = ({ target: { value } }) => setName(value);
  const phoneChange = ({ target: { value } }) => setPhone(value);
  const passwordChange = ({ target: { value } }) => setPassword(value);
  const password2Change = ({ target: { value } }) => setPassword2(value);

  useEffect(() => {
    try {
      axios.get(`http://192.168.0.127:8000/users/search`).then((res) => {
        console.log(res.data);
      });
      const employeeID = sessionStorage.getItem('employeeID');
      axios
        .get(`http://192.168.0.127:8000/users/profile/${employeeID}`)
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          console.log(res.data);
        });
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((res) => setTimeout(res, 1000));
    if (!name || !phone) {
      alert('정보를 전부 입력해주세요!');
      return;
    }

    if (!validateName(name)) {
      alert('이름을 한글로 입력해주세요');
      return;
    }
    if (!validatePhone(phone)) {
      alert('정확한 핸드폰 번호를 입력해주세요');
      return;
    }
    if (password.length > 0 || password2.length > 0) {
      if (!validatePassword(password)) {
        alert('8자 이상의 비밀번호를 입력해주세요!');
        return;
      }
      return;
    }
    if (password !== password2) {
      alert('비밀번호를 재확인해주세요!');
      return;
    }
    try {
      await modi(name, phone, password);
      alert('회원 수정이 완료되었습니다.');
      window.location.reload('/usermodi');
    } catch (error) {
      console.error('Failed to register:', error);
      alert('회원 수정에 실패하였습니다.');
    }
  };
  return (
    <Page>
      <Container className="modi">
        <Title className="modi">USER MODIFY</Title>
        <Box className="modi">
          <Input
            value={name}
            onChange={nameChange}
            className="modi"
            placeholder="Please enter your name"
          ></Input>
          <Input
            value={email}
            className="modi"
            placeholder="Cannot Change Your Email"
            disabled
            style={{ backgroundColor: '#d9d9c0' }}
          />
          <Input
            placeholder="Please enter your phone"
            value={phone}
            onChange={phoneChange}
            className="modi"
          />
          <Input
            type="password"
            value={password}
            className="modi"
            onChange={passwordChange}
            placeholder="Please enter your password"
          />
          <Input
            type="password"
            value={password2}
            className="modi"
            onChange={password2Change}
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
