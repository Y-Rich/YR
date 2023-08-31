import React from 'react';
import { HeaderContainer, HeaderBox, HeaderLogo } from './style';
import { LinkText } from '../Components';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderBox>
        <HeaderLogo to="/usermodi">logo</HeaderLogo>
      </HeaderBox>
      <HeaderBox>
        <LinkText to="/register">회원상태</LinkText>
        <LinkText to="/login">로그인상태</LinkText>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
