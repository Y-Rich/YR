import React, { useState, useEffect } from 'react';
import { HeaderContainer, HeaderBox } from './style';
import { LinkText } from '../Components';
// import { Cookies } from 'react-cookie';

// const cookies = new Cookies();
// export const isLogin = () => !!cookies.get('token');
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  // 백엔드 작업 완료시 state인 isLogin 지우고 위의 함수 isLogin 사용
  const Guest = () => {
    return (
      <HeaderBox>
        <LinkText to="/register">Sign Up</LinkText>
        <LinkText to="/login">Log In</LinkText>
      </HeaderBox>
    );
  };
  const User = () => {
    // const handleLogout = () => {
    //   const cookies = new Cookies();
    //   cookies.remove('token', { path: '/' });
    //   localStorage.clear();
    // };
    return (
      <HeaderBox>
        <LinkText to="/usermodi">MyPage</LinkText>
        <LinkText
          to="/"
          // onClick={handleLogout}
        >
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
