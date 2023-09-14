import React, { useState, useEffect } from 'react';
import { LinkText } from '../Components';
import { styled } from 'styled-components';
import axios from 'axios';
import { info, logout } from '../../../services/user';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import { Text } from './style';

const HeaderContainer = styled.header`
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 1% 0 1% 0;

  background-color: #f8f9fb;
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
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [user, setUser] = useState('');
    const [userName, setUserName] = useState('');
    const [position, setPosition] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [lines, setLines] = useState([]);
    useEffect(() => {
      try {
        info().then((res) => {
          setUserName(res.name);
          const userPosition = res.Position.positionName.toString();
          setUser(userPosition);
          const facMatches = user.match(/fac\d+/g) || [];
          const lineMatches = user.match(/line\d+/g) || [];
          setFacilities(facMatches);
          setLines(lineMatches);
          console.log(userName);
          if (userPosition.includes('manager')) {
            setPosition('manager');
          } else if (userPosition.includes('supervisor')) {
            setPosition('supervisor');
          } else if (userPosition.includes('worker')) {
            setPosition('worker');
          }
        });
      } catch (error) {
        console.error('Failed to loading:', error);
        throw error;
      }
    }, [user]);

    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('position', position);
    if (position !== 'manager') {
      sessionStorage.setItem('facilities', facilities);
      sessionStorage.setItem('lines', lines);
    }
    const openModal = (content) => {
      setModalContent(content);
      setModal(true);
    };
    const closeModal = () => {
      setModal(false);
      setModalContent('');
    };
    const handleLogout = async () => {
      openModal('로그아웃합니다!');
      const token = sessionStorage.getItem('token');
      axios.defaults.headers.common['accessToken'] = `${token}`;
      logout();
      // sessionStorage.removeItem('token');
      sessionStorage.clear();
      setIsLogin(false);
      await new Promise((res) => setTimeout(res, 1000));
      // window.location.reload('/');
    };
    return (
      <HeaderBox>
        <Text>
          <p>
            {position} {userName}
          </p>
        </Text>

        <LinkText to="/admin">ADMIN</LinkText>
        <LinkText to="/usermodi">MyPage</LinkText>
        <LinkText to="/" onClick={handleLogout}>
          Log out
        </LinkText>

        {modal && <Modal setModal={closeModal} element={modalContent} />}
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
