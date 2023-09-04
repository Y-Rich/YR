import React from 'react';
import { LoginContainer, LoginBox } from './style';
import {
  Title,
  Input,
  Button,
  LinkText,
  SmallBox,
  Container,
} from '../../components/Components';

const Login = () => {
  return (
    <Container>
      <Title className="login">LOGIN</Title>
      <LoginBox>
        <Input type="text" placeholder="Please enter your email" />
        <Input type="text" placeholder="Please enter your password" />
      </LoginBox>
      <SmallBox>
        <LinkText to="/register" className="smallbox">
          SIGN IN
        </LinkText>
        <LinkText to="/findpassword" className="smallbox">
          FIND PW
        </LinkText>
      </SmallBox>
      <LoginBox>
        <Button>SUBMIT</Button>
      </LoginBox>
    </Container>
  );
};

export default Login;
