import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
  z-index: 999;
`;

const Img = styled.img`
  z-index: 999;
`;

const Loading = () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <Img src="/assets/Blocks.gif" alt="로딩 중" width="5%" />{' '}
    </Background>
  );
};

export default Loading;
