import React from 'react';
import { HomeContainer } from './style';
import { Link } from 'react-router-dom';
import { LinkText } from '../../components/Components';

const Home = () => {
  return (
    <HomeContainer>
      당신의
      <br />
      <LinkText to="/edukit" style={{ color: '#d9d9d9' }}>
        EduKit
      </LinkText>
      을
      <br />
      즐기세요
    </HomeContainer>
  );
};

export default Home;
