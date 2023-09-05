import React, { useEffect, useState } from 'react';
import { Banner, Button, HomeContainer } from './style';
import { Link } from 'react-router-dom';
import { LinkText } from '../../components/Components';
import Login from '../login/Login';
import Register from '../register/Register';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLogin(!!token);
  }, []);
  return (
    <HomeContainer>
      {isLogin ? <Register /> : <Login />}
      {/* {ready ? (
        <Register ready={ready}>
          <div></div>
        </Register>
      ) : (
        <Banner ready={ready}>
          <Button onClick={handlebutton}>바꾸기~</Button>
        </Banner>
      )} */}
      {/* <Register ready={ready}>
        <div></div>
      </Register>
      <Login>
        <></>
      </Login> */}
    </HomeContainer>
  );
};

export default Home;
