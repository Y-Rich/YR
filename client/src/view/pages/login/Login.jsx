import React from 'react';
import { LoginContainer, SmallBox, LoginBox } from './style';
import { Title, Input, Button, LinkText } from '../../components/Components';

const Login = () => {
  return (
    <LoginContainer>
      <Title>Login</Title>
      <LoginBox>
        <Input type="text" placeholder="Id를 입력하세요" />
        <Input type="text" placeholder="password를 입력하세요" />
      </LoginBox>
      <SmallBox>
        <LinkText to="/register">회원가입</LinkText>
        <LinkText to="/findpassword">비밀번호 찾기</LinkText>
      </SmallBox>
      <LoginBox>
        <Button>Submit</Button>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
