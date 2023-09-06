/*eslint-disable */
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
import axios from 'axios';

const Login = () => {

  const handleOnClick =()=>{
    const data = {userid:"yhoon8",password:"1111"}
    axios.post("http://192.168.0.127:8000/users/login",data).then((res)=>{
      console.log(res);
      const headerValue = res.headers.accesstoken; 
      console.log(headerValue);

    })
  }

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
        <Button onClick={handleOnClick}>SUBMIT</Button>
      </LoginBox>
    </Container>
  );
};

export default Login;
