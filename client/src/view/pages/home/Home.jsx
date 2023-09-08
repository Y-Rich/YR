import React, { useEffect, useState } from 'react';
// import { Banner, Button, HomeContainer } from './style';
import { Link } from 'react-router-dom';
import { Page, LinkText } from '../../components/Components';
import Login from '../user/Login';
import PLC from '../3d/Edukit';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLogin(!!token);
  }, []);
  return (
    <Page>
      {isLogin ? <PLC /> : <Login />}
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
    </Page>
  );
};

export default Home;
