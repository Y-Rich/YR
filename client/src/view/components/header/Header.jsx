import React, { useState, useEffect } from 'react';
import { LinkText } from '../Components';
import { styled } from 'styled-components';
import axios from 'axios';

const HeaderContainer = styled.header`
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 1% 0 1% 0;

  background-color: #d9d9d9;
  color: #000000;
`;

const HeaderBox = styled.div`
  padding: 0 5% 0 5%;
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['accessToken'] = `${token}`;
    setIsLogin(!!token);
  }, []);
  const Guest = () => {
    return (
      <HeaderBox>
        <LinkText to="/register">Sign Up</LinkText>
        <LinkText to="/">Log In</LinkText>
      </HeaderBox>
    );
  };
  const User = () => {
    const handleLogout = () => {
      sessionStorage.removeItem('token');
      setIsLogin(false);
      window.location.href = '/';
    };
    return (
      <HeaderBox>
        <LinkText to="/admin">ADMIN</LinkText>
        <LinkText to="/usermodi">MyPage</LinkText>
        <LinkText to="/" onClick={handleLogout}>
          Log out
        </LinkText>
      </HeaderBox>
    );
  };
  return (
    <HeaderContainer>
      <HeaderBox>
        <LinkText to="/" className="logo">
          Y∞R
        </LinkText>
      </HeaderBox>
      {isLogin ? <User /> : <Guest />}
    </HeaderContainer>
  );
};

export default Header;
