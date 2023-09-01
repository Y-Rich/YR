import React from 'react';
import { LoginContainer, SmallBox, LoginBox } from './style';
import { Title, Input, Button, LinkText } from '../../components/Components';

const Login = () => {
  return (
    <LoginContainer>
      <Title>LOGIN</Title>
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
    </LoginContainer>
  );
};

export default Login;
