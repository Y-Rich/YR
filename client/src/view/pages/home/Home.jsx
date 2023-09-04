import React from 'react';
import { HomeContainer } from './style';
import { Link } from 'react-router-dom';
import { LinkText } from '../../components/Components';

const Home = () => {
  return (
    <HomeContainer>
      <LinkText to="/usermodi" className="usermodi">
        당신
      </LinkText>
      의
      <br />
      <LinkText to="/plc" className="edukit">
        EduKit
      </LinkText>
      을
      <br />
      즐기세요
    </HomeContainer>
  );
};

export default Home;
