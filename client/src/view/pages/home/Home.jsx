import React, { useEffect, useState } from 'react';
import { Page } from '../../components/Components';
import Login from '../user/Login';
import PLC from '../3d/Edukit';
import Pannel from '../pannel/Pannel';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return (
    <>
      {isLogin ? (
        <Pannel />
      ) : (
        <Page>
          <Login />
        </Page>
      )}
    </>
  );
};

export default Home;
