import React, { useEffect, useState } from 'react';
import { Page } from '../../components/Components';
import Login from '../user/Login';
import Main from '../3d/Main';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return (
    <>
      {isLogin ? (
        <Main />
      ) : (
        <Page>
          <Login />
        </Page>
      )}
    </>
  );
};

export default Home;
