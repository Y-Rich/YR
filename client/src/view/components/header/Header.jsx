import React, { useState, useEffect } from 'react';
import { HeaderContainer, HeaderBox } from './style';
import { LinkText } from '../Components';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLogin(!!token);
  }, []);
  const Guest = () => {
    return (
      <HeaderBox>
        <LinkText to="/register">Sign Up</LinkText>
        <LinkText to="/login">Log In</LinkText>
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
